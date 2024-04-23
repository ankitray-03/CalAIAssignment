const express = require("express");
const { pay, success, cancel } = require("../controllers/paypal.controller.js");

const paypalRouter = express.Router();

paypalRouter.post("/pay", pay);
paypalRouter.get("/success", success);
paypalRouter.get("/cancel", cancel);

module.exports = { paypalRouter };
