const mongoose = require("mongoose");

const LikedUsersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
})

const LikesSchema = new mongoose.Schema({
  likesCount: {
    type: Number,
    default: 0
  },
  likedUsers: [LikedUsersSchema]
})

const PostSchema = new mongoose.Schema({

  userId: {
   type: mongoose.Schema.Types.ObjectId,
   ref: "User" 
  },
  caption: {
    type: String,
    trim: true,
  },
  likes: {
    type: LikesSchema,
    default: {
				likesCount: 0,
				likedUsers: [],
			},
  },

}, { timestamps: true })

const Post = mongoose.model('Post', PostSchema);

module.exports = { Post }