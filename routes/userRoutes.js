const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
} = require("../controllers/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/register", (req, res) => {
  res.send("register");
});

module.exports = userRoutes = router;
