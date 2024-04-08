const { Schema, model } = require("mongoose");
// const thoughtSchema = require("./thoughtModel");

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //  validate email address
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address'],
  },

  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "thought",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  ],
});


// Virtual for `friendCount` that gets the amount of friends each User has.
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});


const User = model("user", userSchema);

module.exports = User;
