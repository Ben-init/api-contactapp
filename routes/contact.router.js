const express = require("express");
const passport = require("passport");

const router = express.Router();

const ContactService = require("../services/contacts.service");
const {
  getContactSchema,
  updateContactSchema,
  createContactSchema,
} = require("./../schemas/contacts.schema");
const validatorHandler = require("./../middlewares/validator.handler");

const service = new ContactService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const contact = await service.findAll(userId);
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getContactSchema, "params"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const { id } = req.params;
      const contact = await service.findId(id, userId);
      res.json({ id, contact });
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/info/names/:name",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getContactSchema, "params"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const { name } = req.params;
      const contacts = await service.findName(name, userId);
      res.json(contacts);
    } catch (err) {
      next(err);
    }
  }
);

router.get(
  "/info/numbers/:num",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getContactSchema, "params"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const { num } = req.params;
      const contact = await service.findNum(num, userId);
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/new",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createContactSchema, "body"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const body = req.body;
      const newContact = await service.newContact(body, userId);
      res.json(newContact);
    } catch (err) {
      next(err);
    }
  }
);

router.patch(
  "/update/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateContactSchema, "body"),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const { id } = req.params;
      const data = req.body;
      const contact = await service.updateContact(id, data, userId);
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/drop/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const { sub: userId } = req.user;
      const { id } = req.params;
      const contact = await service.dropContact(id, userId);
      res.json(contact);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
