const { signup, login } = require("../controller/user.controller");
const { body } = require("express-validator");
const userRouter = require("express").Router();

const User = require("../models/User");
userRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .custom(async (value) => {
        const user = await User.findOne({ value });
        if (user) {
          throw new Error("Email is exists!");
        }
      }),
    body("username")
      .trim()
      .isLength({ min: 3, max: 20 })
      .withMessage("username is req"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("password must be greater than 4"),
  ],
  signup
);

userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Enter an vaild email!"),
    body("password").trim().isLength({ min: 4 }),
  ],
  login
);

module.exports = userRouter;
