const Router = require("express").Router();
const controller = require("../controllers/authControllers");

// LOGIN
Router.post("/login", controller.login);

module.exports = Router;
