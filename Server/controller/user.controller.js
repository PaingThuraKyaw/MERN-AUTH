const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//register
exports.signup = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      message: "Something went wrong",
      data: result.array(),
    });
  }

  const { username, password, email } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashPassword,
      email,
    });

    res.status(201).json({
      message: "User created",
      userId: user._id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Email is exists!",
    });
  }
};

//login
exports.login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({
      message: "Something went wrong!",
      data: result.array(),
    });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email is not exists!",
      });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const token = jwt.sign(
      { email: user.email, userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1hr" }
    );

    res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong!",
      data: err,
    });
  }
};
