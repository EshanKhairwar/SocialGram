// Routes api ke andar ky hoga aur kese hoga uske kaam me ayegi

const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Register Controller
async function registerController(req, res) {
  const { username, password } = req.body;

  const existingUser = await userModel.findOne({
    username,
  });

  if (existingUser) {
    return res.status(400).json({
      message: "User Already Exist",
    });
  }

  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Created Successfully",
    user,
  });
}

// Login Controller
async function loginController(req, res) {
  const { username, password } = req.body;
  const user = await userModel.findOne({
    username,
  });



  if (!user) {
    return res.status(400).json({
      message: "User Not Found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "User Logged In Successfully",
  });
}

module.exports = {
  registerController,
  loginController,
};
