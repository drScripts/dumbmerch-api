const express = require("express");
const router = express.Router();
const { register, login, update } = require("../controllers/user");

router.post("/register", register);
router.post("/login", login);
router.put("/:id", update);

module.exports = router;
