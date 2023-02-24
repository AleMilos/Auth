const mongoose = require("mongoose");

// KEEP THIS SIMPLE, don't create NESTED objects
const ItemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true, // there cannot be two items with the same code
    },
    value_of_scientific_notation: {
      type: Number,
      required: true,
    },
    kind_of_scientific_notation: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["In Stock", "Not in Stock", "Waiting to Stock", "Error"],
      default: "In Stock",
      required: true,
    },
    referent: {
      type: String,
      required: true,
    },
    location_id1: {
      //warehouse
      type: String,
      required: true,
    },
    location_id2: {
      //locker
      type: String,
      required: true,
    },
    location_id3: {
      // drawer
      type: String,
      required: true,
    },
    isEditable: {
      type: Boolean,
      required: true,
      default: true,
    },
    editingUserID: {
      type: String,
      required: true,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", ItemSchema);
