const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dsaRoutes = require("./routes/dsaRoutes");
const userRoutes = require("./routes/userRoutes");
const questionRoutes = require("./routes/questionRoutes");
const playlistRoutes = require("./routes/playlistRoutes");
const passport = require("passport");
const { verifyToken } = require("./config/passport");
const port = process.env.PORT || 5000;
require("./db/conn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport").Passport(passport);

app.use("/dsa", dsaRoutes);
app.use("/api", userRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/user", verifyToken, playlistRoutes);

app.listen(port, () => console.log(`Server is listening on port: ${port}`));

module.exports = app;
