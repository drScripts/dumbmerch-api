"use strict";
const { QueryInterface, Sequelize } = require("sequelize");
const { hashSync } = require("bcrypt");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("users", [
      {
        name: "Nathanael",
        role: "admin",
        email: "nathanael.vd2@gmail.com",
        password: hashSync("udin123", 10),
      },
      {
        name: "Nathanael",
        role: "user",
        email: "nathanael.vd3@gmail.com",
        password: hashSync("udin123", 10),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
