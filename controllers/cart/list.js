const { request, response } = require("express");
const { Cart } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { user_id } = req.query;

    const carts = await Cart.findAll({
      include: ["product"],
      where: {
        user_id,
      },
    });

    res.send({
      status: "success",
      data: carts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
