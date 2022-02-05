const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  historyList: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = History = mongoose.model("history", HistorySchema);
