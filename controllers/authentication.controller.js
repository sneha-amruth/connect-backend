const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");

const myJWTSecret = process.env['JWT_SECRET'];

exports.createNewUser = async(req, res) => {
  try{
    const { password } = req.body
    const user = req.body
    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = new User({...user, password: hashedPassword});
    const savedUser = await NewUser.save();
    const token = jwt.sign({ userId: savedUser._id }, myJWTSecret, {expiresIn: '24h'});
    savedUser.password = undefined;
    res.json({ success: true, data: savedUser, token: token});
  } catch(err) {
    res.status(500).json({ success: false, message: "unable to add user", errorMessage: err.message })
  }
}

exports.loginUser = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(user == null) {
     return res.status(200).json({success: false, message: "Invalid email"});
    }
  try{
     if(await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ userId: user._id }, myJWTSecret, {expiresIn: '24h'})
      res.status(200).json({ success: true, data: {userId: user._id, username: user.firstName, email: user.email}, token})
     } else {
       return res.status(200).json({success: false, message: "Invalid password"})
     }
  } catch(err){
    res.status(400).json({success: false, message: "could not retrieve user information ", errorMessage: err.message})
  }
}
