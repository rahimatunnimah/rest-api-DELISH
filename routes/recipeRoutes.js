const Router = require("express").Router();
const controller = require("../controllers/recipeControllers");
const middlewares = require("../middlewares/verifyToken");
const uploadImage = require("../middlewares/uploadRecipeImage");

Router.get("/", controller.getRecipe)
  .get("/detail/:id", controller.getRecipeDetail)
  .get("/search/name", controller.searchNameRecipe)
  .get("/latest/recipe", controller.getLatestRecipe)
  .get("/popular/recipe", controller.getPopularRecipe)
  .get("/popular/list", controller.getListPopularRecipe)
  .get("/comment", controller.getRecipeWithComment)
  .get("/user/:id", controller.getRecipeByUser)
  .post("/add", middlewares.checkToken, uploadImage, controller.addRecipe)
  .patch("/edit", middlewares.checkToken, controller.editRecipe)
  .delete("/delete", middlewares.checkToken, controller.deleteRecipe);

module.exports = Router;
