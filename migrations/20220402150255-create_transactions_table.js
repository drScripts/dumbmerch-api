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

    await queryInterface.createTable("transactions", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "failed", "success"),
        allowNull: true,
        defaultValue: "pending",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      payment_type: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      raw_body: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      total: {
        type: Sequelize.INTEGER,
        allowNull: true,
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

    await queryInterface.addConstraint("transactions", {
      fields: ["user_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
      type: "foreign key",
      references: {
        field: "id",
        table: "users",
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
    await queryInterface.dropTable("transactions");
  },
};
