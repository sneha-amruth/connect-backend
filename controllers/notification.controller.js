const { extend } = require("lodash");
const { Notification } = require("../models/notification.model");

exports.createNotification = async(notificationTo, notificationBy, activity, post = null) => {
  try {
    let newNotif = new Notification({
      notificationTo, 
      notificationBy, 
      activity,
      post
    })
    await newNotif.save();
  } catch(err){
    res.status(500).json({ success: false, message: "unable to create notification", 
     errorMessage: err.message })
  }
}

exports.getNotificationsOfUser = async(req, res) => {
  try {
    const { user } = req;
    const allNotifs = await Notification.find({notificationTo: user._id});
    res.status(200).json({ success: true, data: allNotifs});
  } catch(err){
    res.status(500).json({ success: false, message: "unable to fetch user's notification", 
     errorMessage: err.message })
  }
}