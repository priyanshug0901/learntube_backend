const express = require("express");
const {
  addToHistoryController,
  removeToHistoryController,
  getAllHistoryController,
} = require("../controllers/historyController");
const router = express.Router();

router.post("/", addToHistoryController);
router.put("/", removeToHistoryController);
router.get("/:userId", getAllHistoryController);

module.exports = router;
