const path = require("path");
const express = require("express");
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");

// Add .env variables to process.env object
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();

/**
 * @file server.js manages the whole structure of the application
 * @author Alessandro Milos
 */

var app = express();

if (process.env.NODE_ENV === "production") {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Warehouse api" });
  });
}

// parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use Routes
app.use(require("./routes/indexRoute"));

// use errorMiddleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on Port: ${PORT}`));
