const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Products extends Model {}
  Products.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "name product is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "price product is required",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "stock product is required",
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "description product is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
