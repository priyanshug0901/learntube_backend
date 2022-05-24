const express = require("express");
const { verifyAccessToken } = require("../config/jwt.helper");

const {
  getQuestionController,
  addRecordController,
  userLikedQuestionController,
  getUserQuestionController,
  getUserLikedQuestionController,
} = require("../controllers/questionController");
const router = express.Router();

router.get("/:quesId", getQuestionController);
router.post("/:id", verifyAccessToken, addRecordController);
router.get("/:id", verifyAccessToken, getUserLikedQuestionController);

router.put("/:id", verifyAccessToken, userLikedQuestionController);
router.get("/user/:userId", verifyAccessToken, getUserQuestionController);

module.exports = router;
