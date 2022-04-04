const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
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

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/shipments", shipmentRouter);
app.use("/categories", categoryRouter);
app.use("/products", productRouter);
app.use("/carts", cartRouter);
app.use("/transactions", transactionRouter);

module.exports = app;
