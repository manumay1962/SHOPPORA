const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user-model");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      userName,
      password:hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Registration successfully done",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


module.exports={registerUser}