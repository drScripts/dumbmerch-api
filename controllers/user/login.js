const Joi = require("joi");
const { request, response } = require("express");
const { User } = require("../../models");
const { compareSync } = require("bcrypt");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user)
      return res.status(404).json({
        status: "error",
        message: "User not found!",
      });

    if (!compareSync(password, user.password))
      return res.status(401).json({
        status: "error",
        message: "Wrong password!",
      });

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};
