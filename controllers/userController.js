const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const short = require("short-uuid");
// const
// Input Validation
const validateLoginInput = require("../validation/login");
const validateRegisterInput = require("../validation/register");
const passport = require("passport");
const keys = require("../config/keys");

function registerController(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);
  const translator = short(short.constants.flickrBase58, {
    consistentLength: false,
  });
  console.log(translator.new());
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(409).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        userId: translator.new(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      //   Hashed Password before saving into the database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
}

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
