const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyUser,
  } = require("./verifyToken");


// Get all users
router.get("/", async (req, res) => {
    console.log("Get all users");
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create New Account
router.post("/create-account", async(req, res) => {
    console.log("creating a new account");
    const newUser = new User(req.body);
    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;