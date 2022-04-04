const router = require("express").Router();
const { provences, cities, cost } = require("../controllers/shipment");

router.get("/provinces", provences);
router.get("/city/:provinceId", cities);
router.get("/cost", cost);

module.exports = router;
