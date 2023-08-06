const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addAssignment,
  removeAssignment,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/assignments
router.route('/:studentId/assignments').post(addAssignment);

// /api/students/:userId/assignments/:assignmentId
router.route('/:userId/assignments/:assignmentId').delete(removeAssignment);

module.exports = router;
