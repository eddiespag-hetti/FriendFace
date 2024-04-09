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


  // Update a thought 
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought was found with this id' });
      }
  
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error! Could not update thought', err});
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



  // ----------- REACTIONS ---------------------------//
  // Crete a reaction when thought is updated
  async createReaction(req, res) {
    try {
      // Finds the thought by ID and update it to add the reaction:
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // Adds the reaction to the reactions array
        { $addToSet: { reactions: req.body } }, 
        // Returns the updated thought
        { runValidators: true, new: true } 
      );
  
      if (!thought) {
        return res.status(404).json({ error: 'No thought was found with this id' });
      }
  
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

// Delete a reaction when thought it updated
async deleteReaction(req, res) {
    try {
// Finds the thought by ID and update it to remove the reaction:
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        // Removes the reaction from the reactions array
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        // Returns the updated thought
        { runValidators: true, new: true }
      );
  
      if (!thought) {
        // If no thought is found, return a 404 error
        return res.status(404).json({ error: 'No thought was found with this id' });
      }
    

    
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};







// Exports the controller module for use in other files
module.exports = thoughtController;
