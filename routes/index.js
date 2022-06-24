const express = require("express");

const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const commentRoutes = require("./commentRoutes");

const Router = express.Router();

Router.use("/users", userRoutes);
Router.use("/recipes", recipeRoutes);
Router.use("/comment", commentRoutes);

module.exports = Router;
