const mongoose = require('mongoose');

const ChildSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const UserSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: "Please enter your your firstName"
  },
  lastName: {
    type: String,
    required: "Please enter your your lastName"
  },
  email: {
    type: String,
    required: "Please enter your email id"
  },
  password: {
    type: String,
    required: "Please enter your password",
  },
  username: {
    type: String,
    required: "Please enter your username"
  },
  bio: {
    type: String,
    trim: true
  },
  followers: [ChildSchema],
  following: [ChildSchema]
 
}, { timestamps: true})

const User = mongoose.model('User', UserSchema);

module.exports = { User }
