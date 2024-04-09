const express = require('express');
const { MongoClient } = require('mongodb');
const db = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3001;

const connectionStringURI = `mongodb://127.0.0.1:27017`;
const client = new MongoClient(connectionStringURI);
const dbName = 'FriendFaceDB';

client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
    db = client.db(dbName);

    app.listen(PORT, () => {
      console.log(`Example app listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to Mongo DB: ', err.message);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());