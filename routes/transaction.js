const router = require("express").Router();
const { create, list, show } = require("../controllers/transaction");

router.get("/transactions", list);
router.get("/transaction/:id", show);
router.post("/transaction", create);

module.exports = router;
