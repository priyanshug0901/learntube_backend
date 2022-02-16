const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = Schema({
  userId: {
    type: String,
    unique: true,
    required: true,
  },
  playlist: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

module.exports = Playlist = mongoose.model("playlist", PlaylistSchema);
