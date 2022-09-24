const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");

const router = express.Router();

const UserService = require("./../services/users.service");
const {
  updateUserSchema,
  createUserSchema,
} = require("./../schemas/users.schema");
const validatorHandler = require("./../middlewares/validator.handler");

const service = new UserService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const user = await service.findId(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/new",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const data = req.body;
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await service.newUser({
        ...data,
        password: hash,
      });
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const data = req.body;
      const user = await service.updateUser(userId, data);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/drop",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const user = await service.dropUser(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
