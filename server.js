const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dsaRoutes = require("./routes/dsaRoutes");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const port = process.env.PORT || 5000;
require("./db/conn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/dsa", dsaRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));

module.exports = app;
