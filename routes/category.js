const router = require("express").Router();
const { list, add, update, deleteData } = require("../controllers/category");

router.get("/", list);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", deleteData);

module.exports = router;
