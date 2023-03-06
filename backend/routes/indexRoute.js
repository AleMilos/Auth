const router = require("express").Router();

/**
 * Root for all the routers
 * @module indexRoute
 */

// Make use of all ROUTES
router.use("/api/auth", require("./userRoutes"));

module.exports = router;
