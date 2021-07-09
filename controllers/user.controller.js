const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { createNotification } = require("./notification.controller");

exports.getAllUsers = async(req, res) => {
  try{
    const users = await User.find({});
    res.json({ success: true, users});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to get users", errorMessage: err.message })
  }
}

exports.getUserDetails = async(req, res) => {
  try {
     const user = await User.findById(req.params.userId).populate('followers').populate('following').select("-__v -createdAt -updatedAt");
     res.status(200).json({ success: true, data: user});
  } catch(err) {
     res.status(500).json({ success: false, message: "unable to get user details", errorMessage: err.message })
  }
}

exports.updateUserBio = async(req, res) => {
  try {
    const { bio } = req.body;
    let { user } = req;
    user.bio = bio
    user = await user.save();
    res.status(200).json({ success: true, data: user});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to update user bio", errorMessage: err.message })
  }
}

exports.updateFollowAndFollowingOnFollow = async(req, res) => {
  try {
    let { user } = req;
    let followingUserId = req.body.following;
    let followUser = await User.findById(followingUserId);

    //update following user list
    await user.following.push({
      _id: followingUserId,
      userId: followingUserId
    });
    await user.save();

     //update followers user list
    await followUser.followers.push({
       _id: user._id,
      userId: user._id
    })
    await followUser.save();

    await createNotification(followUser, user._id, "follow");

    const users = await User.find();
     res.status(200).json({ success: true, data: users});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to update follow or followers list on Follow", errorMessage: err.message })
  }
}

exports.updateFollowAndFollowingOnUnFollow = async(req, res) => {
  try {
    let { user } = req;
    let followingUserId = req.body.following;
    let followUser = await User.findById(followingUserId);

    //update following user list
    await user.following.id(followingUserId).remove();
    await user.save();

     //update followers user list
    await followUser.followers.id(user._id).remove();
    await followUser.save();

    const users = await User.find();
     res.status(200).json({ success: true, data: users});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to update follow or followers list on UnFollow", errorMessage: err.message })
  }
}