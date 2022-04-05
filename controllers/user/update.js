const { request, response } = require("express");
const Joi = require("joi");

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const scheme = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone_number: Joi.string().alphanum(),
      gender: Joi.string().valid("male", "female"),
      address: Joi.string(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { email, name, phone_number, gender, address } = req.body;

    const newUser = { email, name, phone_number, gender, address };

    await User.update(newUser, { where: { id } });

    return res.status(201).json({
      status: "created",
      message: "Success update",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
