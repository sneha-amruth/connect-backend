const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({

  notificationTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  notificationBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  activity: {
    type: String,
    enum: ["like", "follow"]
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  }

}, { timestamps: true })

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = { Notification }