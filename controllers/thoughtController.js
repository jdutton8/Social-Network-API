const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');


module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      return res.json(thoughts);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        {_id: req.body.userId},
        {$push: { thoughts: thought._id}},
        { new: true}
      );
      if (!user) {
        return res.status(404).json({ message: 'No user with this id!'});
      }
      
      res.json(thought);
    } catch (err) {
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const user = await User.findOneAndUpdate(
        {username: thought.username},
        {$pull: { thoughts: thought._id }},
        {new: true}
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createReaction(req,res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
          );
    
          if (!thought) {
            return res
              .status(404)
              .json({ message: 'This thought does not exist.' });
          }
    
          res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
},
async deleteReaction(req, res) {
  try {
      const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'This thought does not exist.' });
        }
  
        res.json(thought);
  } catch (err) {
      res.status(500).json(err);
  }
},
};
