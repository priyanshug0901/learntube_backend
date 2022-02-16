const express = require("express");
const { verifyAccessToken } = require("../config/jwt.helper");

const {
  getQuestionController,
  addRecordController,
  userLikedQuestionController,
} = require("../controllers/questionController");
const router = express.Router();

router.get("/", getQuestionController);
router.post("/:id", verifyAccessToken, addRecordController);
router.put("/:id", verifyAccessToken, userLikedQuestionController);

module.exports = router;
