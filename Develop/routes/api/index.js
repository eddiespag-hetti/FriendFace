const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');

router.use('/thought', thoughtRoutes);
router.use('/reaction', reactionRoutes);

module.exports = router;
