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
    const { id } = req.params;

    const transaction = await Transaction.findByPk(id, {
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
      data: {
        transaction,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Interal server error",
    });
  }
};
