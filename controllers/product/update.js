const { request, response } = require("express");
const { Product, Category } = require("../../models");
const Joi = require("joi");
const fs = require("fs");
const path = require("path");

/**
 *
 * @param {request} req
 * @param {response} res
 * @returns
 */
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const scheme = Joi.object({
      name: Joi.string(),
      price: Joi.number(),
      description: Joi.string(),
      stock: Joi.number().min(1),
      category_id: Joi.number(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const product = await Product.findByPk(id);

    if (!product)
      return res.status(404).json({
        status: "Not found",
        message: "Can't find product",
      });

    const { name, price, description, stock, category_id } = req.body;
    const file = req.file;
    let data = {};

    if (category_id) {
      const category = await Category.findByPk(category_id);

      if (!category)
        return res.status(404).json({
          status: "Not found!",
          message: "Can't find category!",
        });

      data.category_id = category_id;
    }

    if (file) {
      data.image_name = file.filename;
      data.image_url = file.filename;

      const imagePath = path.resolve(
        __dirname,
        "../../public/images/products/" + product.image_name
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    data = {
      ...data,
      name,
      price,
      description,
      stock,
    };

    const newProduct = await product.update(data);

    return res.status(201).json({
      status: "created",
      message: "Product updated!",
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
