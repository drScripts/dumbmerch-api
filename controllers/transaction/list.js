const { request, response } = require("express");
const { Model } = require("sequelize");
const { Transaction, TransactionItems } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.user;

    const transactions = await Transaction.findAll({
      where: {
        user_id: id,
      },
      include: [
        "shipment_logs",
        "transaction_logs",
        {
          model: TransactionItems,
          as: "transaction_items",
          include: "product",
        },
      ],
    });

    res.send({
      status: "success",
      data: transactions,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
