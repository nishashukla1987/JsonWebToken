const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamsp: true }
);

module.exports = mongoose.model('User', schema);
