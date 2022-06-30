const Router = require("express").Router();
const controller = require("../controllers/recipeControllers");
const uploadImage = require("../middlewares/uploadRecipeImage");

Router.get("/", controller.getRecipe)
  .get("/search/name", controller.searchNameRecipe)
  .get("/latest", controller.getLatestRecipe)
  .get("/comment", controller.getRecipeWithComment)
  .get("/user/:id", controller.getRecipeByUser)
  .post("/add", uploadImage, controller.addRecipe)
  .patch("/edit", controller.editRecipe)
  .delete("/delete", controller.deleteRecipe);

module.exports = Router;
