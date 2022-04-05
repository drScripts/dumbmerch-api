const express = require("express");
const router = express.Router();
const { register, login, update } = require("../controllers/user");
const middleware = require("../middleware");

router.post("/register", register);
router.post("/login", login);

router.put("/:id", middleware, update);

module.exports = router;
