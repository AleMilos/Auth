const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["Super", "Admin", "Normal", "View"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
