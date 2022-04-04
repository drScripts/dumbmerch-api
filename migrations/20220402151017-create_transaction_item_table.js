"use strict";
const { QueryInterface, DataTypes } = require("sequelize");

module.exports = {
  /**
   * up method migration
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("transaction_items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: new Date(),
      },
    });

    await queryInterface.addConstraint("transaction_items", {
      fields: ["product_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      type: "foreign key",
      references: {
        field: "id",
        table: "products",
      },
    });

    await queryInterface.addConstraint("transaction_items", {
      fields: ["transaction_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      type: "foreign key",
      references: {
        field: "id",
        table: "transactions",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("transaction_items");
  },
};
