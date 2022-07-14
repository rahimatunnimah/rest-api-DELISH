const Router = require("express").Router();
// const middlewares = require("../middlewares/verifyToken");
const controller = require("../controllers/userControllers");
const userUpload = require("../middlewares/uploadProfile");

Router.get("/", controller.getUsers)
  .get("/search/email", controller.searchEmailUsers)
  .patch("/edit", userUpload, controller.editUser)
  .delete("/delete", controller.deleteUser);

module.exports = Router;
