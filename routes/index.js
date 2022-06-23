const express = require("express");

const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");

const Router = express.Router();

Router.use("/users", userRoutes);
Router.use("/recipes", recipeRoutes);

module.exports = Router;
