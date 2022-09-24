const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().alphanum().min(4).max(20);
const num = Joi.number().integer();

const createContactSchema = Joi.object({
  name: name.required(),
  num: num.required(),
});

const updateContactSchema = Joi.object({
  name: name,
  num: num,
});

const getContactSchema = Joi.object({
  id: id,
  name: name,
  num: num,
});

module.exports = { getContactSchema, updateContactSchema, createContactSchema };
