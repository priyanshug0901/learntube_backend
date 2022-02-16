const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController,
  refreshTokenController,
  logoutController,
} = require("../controllers/userController");

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh-token", refreshTokenController);
router.delete("/logout", logoutController);
router.get("/register", (req, res) => {
  res.send("register");
});

module.exports = userRoutes = router;
