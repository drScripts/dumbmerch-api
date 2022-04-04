const { request, response } = require("express");
const { Model } = require("sequelize");
const { Transaction, Cart } = require("../../models");
const Joi = require("joi");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      shipment_service: Joi.string().valid("jne", "tiki", "pos").required(),
      shipment_cost: Joi.number().required(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { shipment_service, shipment_cost } = req.body;
    const { user_id } = req.query;

    const carts = await Cart.findAll({
      where: {
        user_id,
      },
      include: ["product"],
    });

    if (!carts)
      return res.status(400).json({
        status: "error",
        message: "Your cart was empty",
      });

    let total = 0;

    // const transactionData = carts.map((cart, index) => {
    //   console.log(cart);
    // });

    res.send({
      carts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
