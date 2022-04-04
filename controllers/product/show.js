const { request, response } = require("express");
const { Product } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, { include: "category" });

    if (!product)
      return res.status(404).json({
        status: "Not Found",
        message: "Can't find product!",
      });

    res.send({
      status: "success",
      data: product,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
