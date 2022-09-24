const express = require("express");
const authRoute = require("./auth.router");
const usersRoute = require("./user.router");
const contactsRoute = require("./contact.router");

const RouterApi = (app) => {
  const router = express.Router();
  app.use("/api/v1/", router);
  router.use("/auth", authRoute);
  router.use("/users", usersRoute);
  router.use("/contacts", contactsRoute);
};

module.exports = RouterApi;
