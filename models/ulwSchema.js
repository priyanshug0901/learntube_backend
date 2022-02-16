const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// User-liked-watch-question

const UserLWQ = Schema({
  userId: {
    type: String,
    require: true,
  },
  questionId: {
    type: String,
    require: true,
    unique: true,
  },
  liked: {
    type: Boolean,
    require: true,
    default: false,
  },
  watchLater: {
    type: Boolean,
    require: true,
    default: false,
  },
});

module.exports = UserLWL = mongoose.model("userlwl", UserLWQ);
