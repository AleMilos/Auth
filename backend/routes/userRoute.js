const router = require("express").Router();
const {
  login,
  register,
  updatePassword,
  deleteUser,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// ROUTES
router.post("/login", login);
router.post("/register", protect, register);
router.post("/update", protect, updatePassword);
router.post("/delete", protect, deleteUser);

module.exports = router;
