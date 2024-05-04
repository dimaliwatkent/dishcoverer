const express = require("express");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
const router = require("./routes/recipeRoutes.cjs");
const cors = require("cors");

const app = express();

const dbCloudUrl =
  "mongodb+srv://user123:user123@recipes.cgnuijn.mongodb.net/?retryWrites=true&w=majority&appName=recipes";
const dbLocalUrl = "mongodb://localhost:27017/express-mongo-api";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbCloudUrl || dbLocalUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

app.use("/.netlify/functions/api", router);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

module.exports.handler = serverless(app);
