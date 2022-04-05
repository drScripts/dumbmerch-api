const { request, response } = require("express");
const { Model } = require("sequelize");
const { ShipmentLog } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const { transaction_id } = req.query;

    const shipmentLogs = await ShipmentLog.findAll({
      where: { transaction_id },
    });

    res.send({
      status: "success",
      data: {
        shipmentLogs,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
