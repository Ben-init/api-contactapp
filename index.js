const express = require("express");
const passport = require("passport");

const RouterApi = require("./routes");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require("./middlewares/error.handler");
require("./utils/auth");

const app = express();

app.use(express.json());
app.use(passport.initialize());

RouterApi(app);

app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(3000);
