// Requiring the models folder
const { Thought, User } = require('../models');


const thoughtController = {
    
    // Get all Thoughts 
async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      console.log('ERROR: getting all thoughts', err);
      res.status(500).json(err);
    }
  },

  // Get a single thought by _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .populate('reactions');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }
// Sends the thought as a json that matches the searched ID
res.json(thought);
} catch (err) {
console.log(err);
res.status(500).json(err);
}
},


// Create a 'thought' 
async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const userID = req.body.userId;
      const user = await User.findById(userID);
      
      if (!user) {
        return res.status(404).json({ error: 'Cannot find a user with that id' });
      }
      
      // pushes the thought to the user's thoughts array
      user.thoughts.push(thought._id);

      res.status(200).json({ message: 'Thought created successfully', thought });
   // 
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 'Error! Could not create thought!' });
    }
  },


  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'Error 404: No thought found with that ID' });
      };

      res.status(200).json({ message: 'Thought and Reactions were successfully deleted'});
    } catch (err) {
      console.log('Error! Cannot delete thought');
      res.status(500).json(err);
    }
  },

}