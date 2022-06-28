const Router = require("express").Router();
const middlewares = require("../middlewares/verifyToken");

const controller = require("../controllers/userControllers");

Router.get("/", middlewares.checkToken, controller.getUsers)
  .get("/search/email", controller.searchEmailUsers)
  .post("/add", middlewares.checkToken, controller.addUser)
  .patch("/edit", middlewares.checkToken, controller.editUser)
  .delete("/delete", middlewares.checkToken, controller.deleteUser);

module.exports = Router;
