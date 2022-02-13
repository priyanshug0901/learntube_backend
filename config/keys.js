const crypto = require("crypto");
const key1 = crypto.randomBytes(32).toString("hex");
const key2 = crypto.randomBytes(32).toString("hex");

// console.table({ key1, key2 });
require("dotenv").config();

module.exports = {
  mongoURI: process.env.LOCAL_DATABASE,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
