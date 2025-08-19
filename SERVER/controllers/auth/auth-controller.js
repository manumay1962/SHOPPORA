const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user-model");

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ success: false, message: "User already exist" });
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      email,
      userName,
      password: hashPassword,
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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User doesn't exist! Please register first",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Incorrect Password ! Please try again",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

   // res
     // .cookie("token", token, { httpOnly: true, secure: true, sameSite: 'lax' })
      //.json({
       // success: true,
        //message: "Logged in Succesfully",
        //user: {
         // email: checkUser.email,
          //role: checkUser.role,
          //id: checkUser._id,
          //userName: checkUser.userName
          
       // },
      //});

      res.status(200).json({
        success:true,
        message: "Logged in Succesfully",
        token,
        user: {
           email: checkUser.email,
           role: checkUser.role,
           id: checkUser._id,
          userName: checkUser.userName
        }
      })
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
};

const authMiddleware = async (req, res, next) => {
const authHeader = req.headers['authorization'];
const token = authHeader && authHeader.split(' ')[1]
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Unauthorised user!",
    });
  }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
