const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");

const myJWTSecret = process.env['JWT_SECRET'];

exports.authVerify = async(req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, myJWTSecret);
    const user = await User.findById(decoded.userId);
    if(!user) {
      return res.status(400).json({success: false, message: "user does not exist"})
    }
    req.user = user;
    return next();
  } catch(error) {
    return res.status(401).json({ message: "Unauthorised access, please add the token"})
  }
}

