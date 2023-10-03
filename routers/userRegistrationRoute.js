const express = require("express");
const router = express.Router();
const { User } = require("../models/userModel");
const { userID } = require("../utils/userFunction");

// Define a POST route for user registration
router.post("/register", async (req, res) => {
  try {
    const { username, email, number, password } = req.body;
    const user_id = userID();

    // Check if the user with the same email or number already exists
    const existingUser = await User.findOne({
      where: {
        $or: [{ username }, { email }, { number }],
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User with the same username or email or number already exists",
      });
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      number,
      password,
      user_id
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
