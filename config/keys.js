require("dotenv").config();

module.exports = {
  mongoURI: process.env.LOCAL_DATABASE,
  secretOrKey: "secret",
};
