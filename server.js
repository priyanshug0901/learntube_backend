const express = require("express");
const app = express();
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dsaRoutes=require("./routes/dsaRoutes");

const port = process.env.PORT || 5000;

// app.use(bodyParser.json());

mongoose.connect(
    "mongodb://localhost:27017/rent-all",
    {
      autoIndex: false, // Don't build indexes
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      family: 4 // Use IPv4, skip trying IPv6
    }
  );


  // app.use((req, res, next) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  // )});

app.get('/',(req,res)=>{
  res.send("<p>hello</p>");
})
app.use("/dsa", dsaRoutes);
// app.use("/dev", devRoutes);

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
//   });

  // app.use((error, req, res, next) => {
  //   res.status(error.status || 500);
  //   res.json({
  //     error: {
  //       message: error.message
  //     }
  //   });
  // });


  app.listen(port, () => console.log(`Server is listening on port: ${port}`));

  module.exports = app;
