const { request, response } = require("express");
const { Cart, Product } = require("../../models");
const Joi = require("joi");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = Joi.object({
      product_id: Joi.number(),
      quantity: Joi.number().min(1),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const cart = await Cart.findByPk(id);

    if (!cart)
      return res.status(404).json({
        status: "Not found",
        message: "Can't find product",
      });

    const { product_id, quantity = 0 } = req.body;

    if (product_id) {
      const product = await Product.findByPk(product_id);
      if (!product)
        return res.status(404).json({
          status: "Not found",
          message: "Can't find product",
        });
    }

    await cart.update({
      quantity: cart.quantity + quantity,
    });

    res.status(201).json({
      status: "created",
      message: "Success update product to cart",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
