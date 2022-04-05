const router = require("express").Router();
const { list, add, update, deleteData } = require("../controllers/category");
const middlewareAdmin = require("../middleware/admin");

router.get("/categories", list);

router.post("/category", middlewareAdmin, add);
router.patch("/category/:id", middlewareAdmin, update);
router.delete("/category/:id", middlewareAdmin, deleteData);

module.exports = router;
