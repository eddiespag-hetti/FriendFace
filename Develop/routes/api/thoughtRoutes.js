const router = require('express').Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction
} = require('../../controllers/thoughtController');

// /api/thoughts  - Get all thoughts and create a thought
router.route('/')
.get(getAllThoughts)
.post(createThought);

//  /api/thoughts/:id
//   - Get one thought by its _id and return it to the user
//   - Delete a thought by its _id 
router.route('/:thoughtId')
.get(getSingleThought)
.delete(deleteThought)
.put(updateThought);

//  /api/thoughts/:thoughtId/reactions - create reaction
router.route('/:thoughtId/reactions')
.post(createReaction);

// Delete  a reaction by id on the Thought's reactions array.
router.route('/:thoughtId/reactions/:reactionId')
.delete(deleteReaction);

module.exports = router;