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
const { signAccessToken, signRefreshToken } = require("../config/jwt.helper");
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

function loginController(req, res) {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ email: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User Matched
        //  create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };

        // login token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, //1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password is incorrect" });
      }
    });
  });

  //   console.log(req.body);
  //   res.send("login");
}

module.exports = { registerController, loginController };
