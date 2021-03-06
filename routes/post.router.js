const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { getAllPosts, createPost, getPost, updatePost, deletePost, likePost, getPostsByUser } = require("../controllers/post.controller");
const { getPostById } = require("../controllers/params");

router.param("postId", getPostById);
router.get("/", getAllPosts);
router.post("/", authVerify, createPost);
router.get("/:postId", authVerify, getPostById, getPost);
router.delete("/:postId", authVerify, getPostById, deletePost);
router.post("/:postId", authVerify, likePost); 
router.get("/:userId", authVerify, getPostsByUser);

module.exports = router;
