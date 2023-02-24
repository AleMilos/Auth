const mongoose = require("mongoose");
require("dotenv").config();

const devConnection = process.env.MONGO_DEV_URI;
const prodConnection = process.env.MONGO_PROD_URI;

const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "production") {
      const conn = await mongoose.connect(prodConnection);
      console.log(
        `MongoDB Connected: ${conn.connection.host} in production environment`
          .cyan.underline
      );
    } else {
      const conn = await mongoose.connect(devConnection);
      console.log(
        `MongoDB Connected: ${conn.connection.host} in development environment`
          .cyan.underline
      );
    }
  } catch (error) {
    console.log(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;

// const connOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
