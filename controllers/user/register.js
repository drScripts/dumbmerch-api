const { request, response } = require("express");
const Joi = require("joi");
const { hashSync } = require("bcrypt");
const { User } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      gender: Joi.string().valid("male", "female"),
      address: Joi.string(),
      phone_number: Joi.string().alphanum(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password: hashSync(password, 15),
    });

    delete user.dataValues.password;

    return res.status(201).json({
      status: "created",
      data: user,
    });
  } catch (err) {
    const code = err?.original?.constraint;

    const message =
      code === "USER_EMAIL_UNIQUE"
        ? "Email has been taken. Please use another email"
        : err.message;

    const status = code === "USER_EMAIL_UNIQUE" ? 409 : 500;

    return res.status(status).json({
      status: "error",
      message,
    });
  }
};
