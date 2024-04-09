// Requires Mongoose for 'connect' and 'connection'
const { connect, connection } = require('mongoose');

// Connects to the MongoDB database
const connectionString = 'mongodb://127.0.0.1:27017/FriendFaceDB';


connect(connectionString);

// Export connection for 'use'
module.exports = connection;

