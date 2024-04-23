const express = require("express");
const {
  signup,
  signin,
  signout,
  google,
} = require("../controllers/auth.controller.js");

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/logout", signout);
authRouter.post("/google", google);

module.exports = { authRouter };
