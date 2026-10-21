const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const { hashGenerate, hashValidator } = require("../helpers/hashing");
const { tokenGenerator } = require("../helpers/token");
const authVerify = require("../helpers/authVerify");

authRoutes.post("/signup", async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.send(err);
  }
});

authRoutes.post("/signin", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.send("Email is Invalid");
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existingUser.password,
      );

      if (!checkUser) {
        res.send("Password is Invalid");
      } else {
        const token = await tokenGenerator(existingUser.email);
        res.cookie("jwt", token);
        // res.send(token);
        res.send("Login Successful");
      }
    }
  } catch (error) {
    res.send(error);
  }
});

authRoutes.get("/protected", authVerify, (req, res) => {
  res.send("I am protected route");
});

module.exports = authRoutes;
