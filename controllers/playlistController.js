const Playlist = require("../models/playlistSchema");

function addToPlaylistController(req, res) {
  let { userId, playlist } = req.body;
  const newPlaylist = new Playlist({
    userId,
    playlist: [...playlist],
  });

  newPlaylist
    .save()
    .then((list) => {
      res.status(201).json({ success: true, msg: "Playlist created" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Bad Request" });
    });
}

function updateToPlaylistController(req, res) {
  let { id, userId, playlist } = req.body;
  const newPlaylist = new Playlist({
    _id: id,
    userId,
    playlist: [...playlist],
  });

  Playlist.updateOne({ _id: id, userId }, newPlaylist)
    .then((plist) => {
      console.log(plist);
      res
        .status(200)
        .json({ succcess: true, msg: "playlist updated successfully" });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Bad Request" });
    });
}

function getPlaylistController(req, res) {
  let { userId } = req.body;
  Playlist.findOne({ userId })
    .then((plist) => {
      res.status(200).json({ succcess: true, playlist: plist });
    })
    .catch((err) => {
      res.status(400).json({ succcess: false, msg: "Bad Request" });
    });
}

module.exports = {
  addToPlaylistController,
  updateToPlaylistController,
  getPlaylistController,
};
