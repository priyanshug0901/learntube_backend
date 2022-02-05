const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = Schema({
  userId: {
    type: String,
  },
  playList: {
    type: Schema.Types.Mixed,
  },
});

module.exports = Playlist = mongoose.model("playlist", PlaylistSchema);
