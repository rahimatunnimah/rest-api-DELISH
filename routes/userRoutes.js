const Router = require("express").Router();

const controller = require("../controllers/userControllers");

Router.get("/", controller.getUsers)
  .post("/add", controller.addUser)
  .patch("/edit", controller.editUser)
  .delete("/delete", controller.deleteUser);

module.exports = Router;
