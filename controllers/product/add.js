const { request, response } = require("express");
const Joi = require("joi");
const { Product, Category } = require("../../models");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const scheme = Joi.object({
      name: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      stock: Joi.number().min(1).required(),
      category_id: Joi.number().required(),
    });

    const validation = scheme.validate(req.body);

    if (validation.error)
      return res.status(400).json({
        status: "error",
        message: "Error body!",
        validation_error: validation.error.details,
      });

    const { name, price, description, stock, category_id } = req.body;
    const file = req.file;

    const category = await Category.findByPk(category_id);

    if (!file)
      return res.status(400).json({
        status: "error",
        message: "Please upload product image",
      });

    if (!category)
      return res.status(404).json({
        status: "Not found!",
        message: "Can't find category!",
      });

    const fileName = file.filename;

    await Product.create({
      name,
      price,
      description,
      stock,
      category_id,
      image_name: fileName,
      image_url: fileName,
    });

    res.status(201).json({
      status: "created",
      message: "Success add products",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
