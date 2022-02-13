const History = require("../models/historySchema");

function addToHistoryController(req, res) {
  let { userId, questionObj } = req.body;

  const newHistory = new History({
    userId,
    question: questionObj,
  });

  newHistory
    .save()
    .then((hist) => {
      console.log(hist);
      res.status(201).json({ success: true, msg: "Added in a History" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: true, msg: "Bad Request" });
    });
}

function removeToHistoryController(req, res) {
  let { id, isArchive } = req.body;

  const newHistory = new History({
    _id: id,
    archive: isArchive,
  });

  History.updateOne({ _id: id }, newHistory)
    .then((hist) => {
      res.status(201).json({ success: true, msg: "Updated in History" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ success: true, msg: "Bad Request" });
    });
}

function getAllHistoryController(req, res) {
  const userId = req.params.userId;

  History.find({ userId: userId })
    .then((history) => {
      res.status(200).json(history);
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  addToHistoryController,
  removeToHistoryController,
  getAllHistoryController,
};
