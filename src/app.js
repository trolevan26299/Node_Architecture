const express = require("express");
const morgan = require("morgan");
const { default: helmet } = require("helmet");
const compression = require("compression");
const app = express();

// init middleware
app.use(morgan("dev")); // show logs when client send request
app.use(helmet()); // help security
app.use(compression()); // help save bandwidth

// init DB
require("./dbs/init.mongodb");
const { checkOverLoad } = require("./helpers/check.connect");
checkOverLoad();

// init router
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Welcome to Andrew",
  });
});

// handling error

module.exports = app;
