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
        product_id: 11,
        user_id: 4,
        quantity: 1,
      },
      {
        product_id: 12,
        user_id: 4,
        quantity: 1,
      },
      {
        product_id: 13,
        user_id: 4,
        quantity: 1,
      },
      {
        product_id: 14,
        user_id: 4,
        quantity: 1,
      },
      {
        product_id: 15,
        user_id: 4,
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
