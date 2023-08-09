const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes.js');
const usersRoutes = require('./usersRoutes.js');

router.use('/thoughts', thoughtsRoutes);
router.use('/users', usersRoutes);

module.exports = router;
