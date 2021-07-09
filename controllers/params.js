const { User } = require('../models/user.model')
const { Post } = require('../models/post.model')

exports.getUserById = async(req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(400).json({ success: false, message: "user does not exist"})
    }
    req.user = user;
    next()
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve user", error: err.message});
  }
}

exports.getPostById = async(req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(400).json({ success: false, message: "post does not exist"})
    }
    req.post = post;
    next()
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve post", error: err.message});
  }
}