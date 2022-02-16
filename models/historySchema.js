const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  question: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true,
  },
  archive: {
    type: Boolean,
    default: true,
  },
});

module.exports = History = mongoose.model("history", HistorySchema);
