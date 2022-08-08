const Router = require("express").Router();
const middlewares = require("../middlewares/verifyToken");
const controller = require("../controllers/userControllers");
const userUpload = require("../middlewares/uploadProfile");

Router.get("/", controller.getUsers)
  .get("/search/email", controller.searchEmailUsers)
  .get("/liked/recipe/:id", controller.getLikedRecipe)
  .get("/saved/recipe/:id", controller.getSavedRecipe)
  .patch("/edit", middlewares.checkToken, userUpload, controller.editUser)
  .delete("/delete", middlewares.checkToken, controller.deleteUser);

module.exports = Router;
