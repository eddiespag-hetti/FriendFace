const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Reaction Schema
const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
});

// Getter method to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString();
});

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;
