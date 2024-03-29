const Router = require("express").Router();
const controller = require("../controllers/recipeControllers");
const middlewares = require("../middlewares/verifyToken");
const uploadImage = require("../middlewares/uploadRecipeImage");

Router.get("/", controller.getRecipe)
  .get("/detail/:id", controller.getRecipeDetail)
  .get("/search/name", controller.searchNameRecipe)
  .get("/sort/category", controller.sortRecipeByCategory)
  .get("/sort/name/desc", controller.getListRecipeNameDesc)
  .get("/sort/name/asc", controller.getListRecipeNameAsc)
  .get("/latest/recipe", controller.getLatestRecipe)
  .get("/popular/recipe", controller.getPopularRecipe)
  .get("/popular/list", controller.getListPopularRecipe)
  .get("/comment", controller.getRecipeWithComment)
  .get("/user/:id", middlewares.checkToken, controller.getRecipeByUser)
  .get("/video/:id", controller.getVideoByRecipe)
  .get("/category", controller.getCategory)
  .post("/add", middlewares.checkToken, uploadImage, controller.addRecipe)
  .post("/add/video", middlewares.checkToken, controller.addVideoRecipe)
  .post("/add/category", middlewares.checkToken, controller.addCategory)
  .patch("/edit", middlewares.checkToken, controller.editRecipe)
  .patch("/edit/category", middlewares.checkToken, controller.editCategory)
  .delete("/delete", middlewares.checkToken, controller.deleteRecipe)
  .delete(
    "/delete/category",
    middlewares.checkToken,
    controller.deleteCategory
  );

module.exports = Router;
