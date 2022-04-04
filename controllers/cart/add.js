const { request, response } = require("express");
const { Cart, User, Product } = require("../../models");
const Joi = require("joi");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { user_id } = req.query;
    const scheme = Joi.object({
      product_id: Joi.number().required(),
      quantity: Joi.number().min(1).required(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { product_id, quantity } = req.body;

    const user = await User.findByPk(user_id);
    if (!user)
      return res.status(403).json({
        status: "Forbiden",
        message: "Restricted Area",
      });

    const product = await Product.findByPk(product_id);
    if (!product)
      return res.status(404).json({
        status: "Not found",
        message: "Can't find product",
      });

    const cart = await Cart.findOne({
      where: {
        UserId: user_id,
        product_id,
      },
    });

    if (cart) {
      await cart.update({
        quantity: cart.quantity + quantity,
      });
    } else {
      await Cart.create({
        UserId: user_id,
        quantity,
        product_id,
      });
    }

    res.status(201).json({
      status: "created",
      message: "Success add product to cart",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
