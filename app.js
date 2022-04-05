const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const middleware = require("./middleware");

const usersRouter = require("./routes/users");
const shipmentRouter = require("./routes/shipment");
const categoryRouter = require("./routes/category");
const productRouter = require("./routes/products");
const cartRouter = require("./routes/cart");
const transactionRouter = require("./routes/transaction");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const prefix = "/api/v1";

app.use(prefix, usersRouter);

app.use(middleware);
app.use(prefix, shipmentRouter);
app.use(prefix, categoryRouter);
app.use(prefix, productRouter);
app.use(prefix, cartRouter);
app.use(prefix, transactionRouter);

module.exports = app;
