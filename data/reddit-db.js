/* Mongoose Connection */
const mongoose = require('mongoose');
assert = require('assert');

const url = 'mongodb://localhost/reddit-db';
mongoose.connect(
  url,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
  },
  (err) => {
    assert.equal(null, err);
    console.log("Connected successfully to database");

    // db.close(); turn on for testing
  }
);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'));
mongoose.set('debug', true);

module.exports = mongoose.connection;