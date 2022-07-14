const Router = require("express").Router();
const middlewares = require("../middlewares/verifyToken");
const controller = require("../controllers/userControllers");
const userUpload = require("../middlewares/uploadProfile");

Router.get("/", middlewares.checkToken, controller.getUsers)
  .get("/search/email", controller.searchEmailUsers)
  .patch("/edit", middlewares.checkToken, userUpload, controller.editUser)
  .delete("/delete", middlewares.checkToken, controller.deleteUser);

module.exports = Router;
