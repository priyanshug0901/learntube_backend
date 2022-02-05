const express = require("express");
const verifyToken = require("../config/passport").verifyToken;
const {
  getQuestionController,
  addRecordController,
  userLikedQuestionController,
} = require("../controllers/questionController");
const router = express.Router();

router.get("/", getQuestionController);
router.post("/:id", verifyToken, addRecordController);
router.put("/:id", verifyToken, userLikedQuestionController);

module.exports = router;
