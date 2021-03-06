const { request, response } = require("express");

/**
 *
 * @param {request} req
 * @param {response} res
 */
module.exports = (req, res, next) => {
  console.log(req.user);

  if (!req.user)
    return res.status(403).json({
      status: "Restricted Area",
      message: "You dont have permission to access this page",
    });

  if (req.user.role !== "admin")
    return res.status(403).json({
      status: "Restricted Area",
      message: "You dont have permission to access this page",
    });

  next();
};
