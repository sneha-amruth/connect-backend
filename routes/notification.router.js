const express = require("express");
const router = express.Router();

const { authVerify } = require("../middlewares/authVerify");
const { createNotification, getNotificationsOfUser } = require("../controllers/notification.controller");

router.post("/:userId", authVerify, createNotification);
router.get("/", authVerify, getNotificationsOfUser);


module.exports = router;