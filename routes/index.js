const express = require("express");

const userRoutes = require("./userRoutes");
const recipeRoutes = require("./recipeRoutes");
const commentRoutes = require("./commentRoutes");
const authRoutes = require("./authRoutes");

const Router = express.Router();

Router.use("/users", userRoutes);
Router.use("/recipes", recipeRoutes);
Router.use("/comment", commentRoutes);
Router.use("/auth", authRoutes);

module.exports = Router;
