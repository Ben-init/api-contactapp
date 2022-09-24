const Joi = require("joi");

const name = Joi.string().alphanum().min(4).max(20);
const email = Joi.string().email();
const password = Joi.string().min(8);

const createUserSchema = Joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  password: password,
});

module.exports = { updateUserSchema, createUserSchema };
