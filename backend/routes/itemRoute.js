const router = require("express").Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  loadItem,
  deleteItem,
  resetEditableItem,
} = require("../controllers/itemController");

router.post("/load", protect, loadItem);
router.post("/reseteditable", protect, resetEditableItem);
router.delete("/delete", protect, deleteItem);

module.exports = router;
