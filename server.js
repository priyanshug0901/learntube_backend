const express = require("express");
const app = express();
const dsaRoutes=require("./routes/dsaRoutes");
require("./db/conn");



const port = process.env.PORT || 5000;

app.use("/dsa", dsaRoutes);


  app.listen(port, () => console.log(`Server is listening on port: ${port}`));

  module.exports = app;
