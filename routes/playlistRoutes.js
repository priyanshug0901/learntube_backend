const express = require("express");
const {
  addToPlaylistController,
  updateToPlaylistController,
} = require("../controllers/playlistController");
const router = express.Router();

router.post("/playlist", addToPlaylistController);
router.put("/playlist", updateToPlaylistController);

module.exports = router;
