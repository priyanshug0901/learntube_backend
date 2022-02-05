const ulwSchema = require("../models/ulwSchema");

function getQuestionController(req, res) {
  res.send("hello");
}

// When a user try to click liked,watchlater it will create a new record in the table
function addRecordController(req, res) {
  let { userId, questionId } = req.body;
  ulwSchema
    .findOne({ questionId })
    .then((question) => {
      if (question) {
        return res.status(409).send({ question: "Question already added" });
      } else {
        const newUserQuestion = new ulwSchema({
          userId,
          questionId,
        });

        newUserQuestion
          .save()
          .then((question) => res.send(question))
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function userLikedQuestionController(req, res, next) {
  let { id, userId, questionId, isLiked, isWatchLater } = req.body;

  const updateQuestion = new ulwSchema({
    _id: id,
    liked: isLiked,
    watchLater: isWatchLater ? true : false,
  });

  ulwSchema
    .updateOne({ _id: id, questionId, userId }, updateQuestion)
    .then((quest) => {
      res.status(201).json({ success: true, msg: "Updated Successfull" });
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  getQuestionController,
  addRecordController,
  userLikedQuestionController,
};
