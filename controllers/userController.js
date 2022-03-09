const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const short = require("short-uuid");
const createError = require("http-errors");
// const
// Input Validation
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const passport = require("passport");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../config/jwt.helper");
const keys = require("../config/keys");

const registerController = async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    const translator = short(short.constants.flickrBase58, {
      consistentLength: false,
    });
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const doesExist = await User.findOne({ email: req.body.email });
    if (doesExist) {
      return res.send({ success: false, message: `user already registered` });
    }

    const newUser = new User({
      userId: translator.new(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    const accessToken = await signAccessToken(savedUser.userId);
    const refreshToken = await signRefreshToken(savedUser.userId);

    res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
};

async function loginController(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation

  try {
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email });
    if (!user) {
      throw res.status(403).json({ success: false, message: "Forbidden" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(403).json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const accessToken = await signAccessToken(user.userId);
    const refreshToken = await signRefreshToken(user.userId);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
  }
}

async function refreshTokenController(req, res, next) {
  let { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      throw createError.BadRequest();
    }
    const userId = await verifyRefreshToken(refreshToken);
    const accessToken = await signAccessToken(userId);
    const rToken = await signRefreshToken(userId);
    res.send({ accessToken, refreshToken: rToken });
  } catch (error) {
    next(error);
  }
}

async function logoutController(req, res) {
  try {
    let { refreshToken } = req.body;
    if (!refreshToken) throw createError.BadRequest();

    let userId = await verifyRefreshToken(refreshToken);

    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
};
