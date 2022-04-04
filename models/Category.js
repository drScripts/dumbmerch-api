const { Sequelize, DataTypes } = require("sequelize");

/**
 *
 * @param {Sequelize} sequelze
 * @param {DataTypes} DataTypes
 */
module.exports = (sequelze, DataTypes) => {
  const Category = sequelze.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
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
    },
    { timestamps: true, tableName: "category" }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "category_id",
      onDelete: "CASCADE",
      as: "products",
    });
  };

  return Category;
};
