const connection = require('../config/connection');
const { Thought, User} = require('../models');

const { users, thoughts } = require('./data');

connection.once('open', async () => {
    console.log('connected!');
    const userData = await User.create(users);
    const thoughtData = await Thought.create(thoughts);
    console.log(userData, thoughtData);
    procces.exit(0);
})
