
const { User } = require('../models');



const userController = {

// Get all Users 
 async getUsers (req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users)


    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    } 
},

// Get a single User by _id
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .populate('friends')

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
    }
    catch (err) {
      res.status(500).json({ err });
      return;
    }
    
    res.status(200).json(user)
},

// Create a new User
 
 async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a User and remove them the thought
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId },
        { $pull: { thoughts: { thoughtId: req.params.thoughtId } } },
        { new: true }
      );

      // 
      if (!user) {
        return res.status(404).json({ message: 'No user could be found with that id' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: `Error! Could not remove user's thoughts`, err });
    }
  },



  // Update a User 
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error 500 updating user with reaction', err });
    }
  },

  
  // Add a user's friend 
  async createFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        // addToSet will only add the friend if it is not already in the array
        { $addToSet: { friends: req.params.friendId } },
        // runValidators will make sure the friendId is a valid ObjectId
        { runValidators: true, new: true }
      );
console.log(user)
      if (!user) {
        // if the user is not found, return a 404 error
        return res.status(404).json({ error: 'No user was found with this id' });
      }

      res.json(user); // return the updated user
    } catch (err) {
      res.status(500).json(err);
    }
  },


  // Delete a User's friend 

  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        // find the user by id
        { _id: req.params.userId },
        // pull the friendId from the friends array
        { $pull: { friends: req.params.friendId } },
        // runValidators will make sure the friendId is a valid ObjectId
        { runValidators: true, new: true }
      );

      if (!user) {
        // if the user is not found, return a 404 error
        return res.status(404).json({ error: 'No user with this id' });
      }

      
      res.json(user); // return the updated user
    } catch (err) {
      res.status(500).json(err);
    }
  },
};







      







// Exports the userController object so that it can be used in other files
module.exports = userController;



