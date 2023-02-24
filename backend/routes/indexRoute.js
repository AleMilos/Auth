const router = require("express").Router();

// Make use of all ROUTES
router.use("/api/auth", require("./userRoute"));
router.use("/api/item", require("./itemRoute"));

module.exports = router;
