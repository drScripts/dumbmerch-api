const router = require("express").Router();
const { create } = require("../controllers/transaction");

router.post("/", create);

module.exports = router;
