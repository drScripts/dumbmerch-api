const router = require("express").Router();
const { provences, cities, cost, logs } = require("../controllers/shipment");

router.get("/shipment/provinces", provences);
router.get("/shipment/cities/:provinceId", cities);
router.get("/shipment/cost", cost);
router.get("/shipment/logs", logs);

module.exports = router;
