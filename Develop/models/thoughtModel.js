const { Schema, model, Types } = require("mongoose");
const dayjs = require("dayjs");

// Uses dayjs() instead of Date.now for date formatting.
function formatDate(date) {
  return dayjs(date).format("ddd, MMM D, YYYY h:mm A");
}

// Reaction Schema - is embedded within the Thought Schema, does not require its own.
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },

    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Thought Schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

// Virtual to retrieve the ammount of reactions each Thought has associated
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
