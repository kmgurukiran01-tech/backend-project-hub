const express = require('express');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

dotenv.config();  // Load the environment variables

MongoClient.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log('DB Connected Successfully');
  })
  .catch((error) => {
    console.log('Error', error);
  });

const app = express();
app.listen(3000, () => {
  console.log('Server started');
});t