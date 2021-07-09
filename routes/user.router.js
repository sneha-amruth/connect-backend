const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { getAllUsers, getUserDetails, updateUserBio, updateFollowAndFollowingOnFollow, updateFollowAndFollowingOnUnFollow } = require("../controllers/user.controller");
const { createNewUser, loginUser } = require("../controllers/authentication.controller");

const { getUserById } = require("../controllers/params.js");

router.param("userId", getUserById);

router.post("/register", createNewUser);
router.post("/login", loginUser);
router.get("/", authVerify, getAllUsers);
router.get("/:userId", authVerify, getUserDetails);
router.post("/bio/:userId", authVerify, updateUserBio);
router.post("/follow/:userId", authVerify, updateFollowAndFollowingOnFollow); //also create notif
router.post("/unfollow/:userId", authVerify, updateFollowAndFollowingOnUnFollow);

module.exports = router;
