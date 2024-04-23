const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const paypal = require("paypal-rest-sdk");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

dotenv.config();

const app = express();
app.use(express.json());

// cors setup
var whitelist = ["http://localhost:5173"];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));

// All routes
const { paypalRouter } = require("./routes/paypal.routes.js");
const { authRouter } = require("./routes/auth.routes.js");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

app.listen(PORT, () => {
  console.log("Running on PORT : ", PORT);
});

// All api's routes
app.use("/api/paypal", paypalRouter);
app.use("/api/auth", authRouter);

// middlewares
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
