const express = require("express");
const dsaRoutes = express.Router();
const questionModel = require("../models/questionSchema");
const paginatedResults = require("./paginated");

dsaRoutes.get("/", async (req, res) => {
  try {
    console.log(req.query);
    if (req.query.topic) {
      let topic = req.query.topic;
      let reg = new RegExp(topic);
      const questions = await questionModel.find({ pattern: reg });
      console.log(questions);
      return res.status(200).json({ success: true, result: questions });
    }
    // console.log(res.result);
    const questions = await questionModel.find();
    res.status(200).json({ success: true, result: questions });
  } catch (error) {
    console.log(error);
    res.status(501).json({ success: false, err: error.message });
  }
});

module.exports = dsaRoutes;
