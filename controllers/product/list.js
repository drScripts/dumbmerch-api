const { request, response } = require("express");
const { Op } = require("sequelize");
const { Product } = require("../../models");
const { paginationObj } = require("../../helpers");
const { baseUrl } = require("../../config");

const queryBuilder = (q, start, end, category) => {
  const obj = {};
  if (q || start || end || category) {
    if (q) {
      obj.name = {
        [Op.like]: `%${q}%`,
      };
    }

    if (start) {
      obj.price = {
        [Op.gte]: start,
      };
    }

    if (end) {
      obj.price = {
        [Op.lte]: end,
      };
    }

    if (start && end) {
      obj.price = {
        [Op.between]: [start, end],
      };
    }

    if (category) {
      obj.category_id = category;
    }

    return {
      [Op.and]: obj,
    };
  } else {
    return null;
  }
};

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = async (req, res) => {
  try {
    const {
      q = null,
      page = 1,
      start = null,
      end = null,
      category = null,
    } = req.query;

    const dataLimit = 10;
    const dataOffset = page * dataLimit - dataLimit;

    const { count, rows } = await Product.findAndCountAll({
      limit: dataLimit,
      offset: dataOffset,
      where: queryBuilder(q, start, end, category),
    });

    rows.map((val, i) => {
      if (val.image_url.search("http") === -1) {
        val.image_url = `${baseUrl}/images/products/${val.image_name}`;
      }
      return val;
    });

    res.send({
      status: "success",
      data: rows,
      pagination: paginationObj(count, dataLimit, page, {
        q,
        start,
        end,
        category,
      }),
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
