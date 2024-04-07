const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');



module.exports = {
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

// Get a single User
async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

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
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },


}
