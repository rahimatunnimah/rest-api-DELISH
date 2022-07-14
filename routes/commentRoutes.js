const Router = require("express").Router();
const controller = require("../controllers/commentControllers");

Router.get("/", controller.showAllComment)
  .get("/recipe", controller.getCommentByRecipe)
  .post("/add", controller.addComment)
  .patch("/edit", controller.editComment)
  .delete("/delete", controller.deleteComment);
module.exports = Router;
