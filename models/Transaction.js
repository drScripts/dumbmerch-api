const { Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelize
 * @param {DataTypes} DataTypes
 */
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define("Transaction", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "failed", "success"],
      defaultValue: "pending",
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    raw_body: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    payment_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
    },
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "users",
    });

    Transaction.hasMany(models.ShipmentLog, {
      foreignKey: "transaction_id",
      as: "shipment_logs",
    });

    Transaction.hasMany(models.TransactionItems, {
      foreignKey: "transaction_id",
      as: "transaction_items",
    });

    Transaction.hasMany(models.TransactionLog, {
      foreignKey: "transaction_id",
      as: "transaction_logs",
    });
  };

  return Transaction;
};
