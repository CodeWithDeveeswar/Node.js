const express = require("express");
const authRoutes = express.Router();
const User = require("../models/User");
const { hashGenerate } = require("../helpers/hashing");
const { hashValidator } = require("../helpers/hashing");
const { tokenGenerator } = require("../helpers/token");
const authVerify = require("../helpers/authVerify");
const { resetTokenGenerator } = require("../helpers/token");
const { resetTokenValidator } = require("../helpers/token");

authRoutes.post("/signup", async (req, res) => {
  try {
    const hashPassword = await hashGenerate(req.body.password);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    const savedUser = await user.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send(err);
  }
});

authRoutes.post("/signin", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).send({ msg: "Email is Invalid" });
    } else {
      const checkUser = await hashValidator(
        req.body.password,
        existingUser.password,
      );

      if (!checkUser) {
        res.status(401).send({ msg: "Password is Invalid" });
      } else {
        const token = await tokenGenerator(existingUser.email);
        res.cookie("jwt", token);
        res.status(200).send({ msg: "Login Successful", token: token });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

authRoutes.get("/protected", authVerify, (req, res) => {
  res.status(200).send({ msg: "I am protected route" });
});

authRoutes.post("/forgot-password", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      return res.status(404).send({ msg: "Email is Invalid" });
    }

    const resetToken = resetTokenGenerator(existingUser.email);

    res.status(200).send({
      msg: "Password reset access code generated",
      resetToken: resetToken,
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

authRoutes.post("/reset-password", async (req, res) => {
  try {
    const { resetToken, password } = req.body;

    const valid = resetTokenValidator(resetToken);

    if (!valid) {
      return res.status(401).send({ msg: "Invalid or Expired Reset Token" });
    }

    const existingUser = await User.findOne({
      email: valid.email,
    });

    if (!existingUser) {
      return res.status(404).send({ msg: "User Not Found" });
    }

    const hashPassword = await hashGenerate(password);

    existingUser.password = hashPassword;
    await existingUser.save();

    res.status(200).send({ msg: "Password Reset Successful" });
  } catch (err) {
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

module.exports = authRoutes;
