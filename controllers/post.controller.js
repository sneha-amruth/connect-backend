const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

exports.getAllPosts = async(req, res) => {
   try {
     const allPosts = await Post.find({});
      res.status(200).json({ success: true, data: allPosts});
   } catch(err) {
    res.status(500).json({ success: false, message: "unable to get all posts", 
     errorMessage: err.message })
  }
 }

exports.createPost = async(req, res) => {
  try {
    const { user } = req;
    const { caption } = req.body;
    let NewPost = new Post(
       { userId: user._id,
      caption, 
       })
    await NewPost.save();
    res.status(200).json({ success: true, data: NewPost});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to create post", 
    errorMessage: err.message })
   }
 }

 exports.deletePost = async(req, res) => {
  try {
     const { user, post } = req;
    const userId = user._id;
    
    if(userId.equals(post.userId)){
      await post.remove();
       res.status(200).json({ success: true, message: "post successfully deleted"});
    }
    else {
      res.status(401).json({ success: false, message: "you're not authorized to delete others post"})
     }
   } catch(err) {
     res.status(500).json({ success: false, message: "unable to delete post", 
    errorMessage: err.message })
   }
 }

 exports.likePost = async(req, res) => {
   try {
     const { user, post } = req;
     const { likesCount } = req.body;
     const alreadyLiked = post.likes.likedUsers.find(item => item._id.equals(user._id));

     if(alreadyLiked) {
       let updatedPost = await post.likes.likedUsers.id(user._id).remove()
       updatedPost = {...post, likes: {...post.likes, likesCount}};
        updatedPost = extend(post, updatedPost)
       await updatedPost.save();
        res.status(200).json({ success: true, message: "removed like from post"});
     } else {
       let updatedPost = {...post, 
          likes: {
            likesCount,
            likedUsers: post.likes.likedUsers.concat({_id: user._id})
       }};
       updatedPost = extend(post, updatedPost)
        await updatedPost.save();
         res.status(200).json({ success: true, data: updatedPost,  message: "liked the post"});
     }

   } catch(err) {
     res.status(500).json({ success: false, message: "unable to like or remove like from post", 
    errorMessage: err.message })
   }
 }

 exports.getPostsByUser = async(req, res) => {
   try {
     const userId = req.params.userId;
     const allPostsOfAUser = await Post.find({userId});
     res.status(200).json({ success: true, data: allPostsOfAUser});
   } catch(err) {
     res.status(500).json({ success: false, message: "unable to fetch users post", 
    errorMessage: err.message })
   }
 }