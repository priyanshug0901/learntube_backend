const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect(
    "mongodb://localhost:27017/rent-all",
    {
      useMongoClient: true
    }
  );


  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  )});


app.use("/dsa", dsaRoutes);
app.use("/dev", devRoutes);

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });

  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });


  app.listen(port, () => console.log(`Server is listening on port: ${port}`));

  module.exports = app;
