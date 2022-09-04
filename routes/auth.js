const authRouter = require("express").Router();
const User = require("../models/userModel");
const hashPassword = require("../utils/password");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* REGISTER */
authRouter.post("/register", async (req, res) => {
  const body = req.body;

  /* validate email and password */
  if (!body.email || !body.password) {
    return res.status(400).json("Email and password are required");
  }
  const newUser = new User({
    username: body.username,
    email: body.email,
    password: await hashPassword(body.password),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* LOGIN */
authRouter.post("/login", async (req, res) => {
  const body = req.body;

  /* validate eamil and password */
  if (!body.email || !body.password) {
    return res.status(400).json("Email and password are required");
  }
  const user = await User.findOne({ email: body.email });
  if (!user) {
    return res.status(400).json("Email not found");
  }
  // const password = await hashPassword(body.password);
  const isPasswordValid = await bcrypt.compare(body.password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json("Invalid password");
  }

  const accessToken = jwt.sign(
    { _id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEC,
    { expiresIn: "12h" }
  )
  
  try {
    
    res.status(200).json({user, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = authRouter;
