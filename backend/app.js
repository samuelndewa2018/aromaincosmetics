const express = require("express");
const app = express();
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(fileUpload());

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// Route imports
const product = require("./routes/ProductRoute");
const newproduct = require("./routes/NewProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const mpesaRoutes = require("./routes/mpesa");

app.use("/api/v1", product);
app.use("/api/v1", newproduct);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", mpesaRoutes);
app.use("/orders/api/v1", order);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

// it's for errorHandeling
app.use(ErrorHandler);

module.exports = app;
