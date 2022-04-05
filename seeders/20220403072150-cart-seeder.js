"use strict";

module.exports = {
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

    await queryInterface.bulkInsert("cart", [
      {
        product_id: 1,
        user_id: 2,
        quantity: 1,
      },
      {
        product_id: 2,
        user_id: 2,
        quantity: 1,
      },
      {
        product_id: 3,
        user_id: 2,
        quantity: 1,
      },
      {
        product_id: 4,
        user_id: 2,
        quantity: 1,
      },
      {
        product_id: 5,
        user_id: 2,
        quantity: 1,
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
    await queryInterface.bulkDelete("cart", null, {});
  },
};
