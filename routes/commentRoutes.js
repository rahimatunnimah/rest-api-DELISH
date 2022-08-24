const Router = require("express").Router();
const middlewares = require("../middlewares/verifyToken");
const controller = require("../controllers/commentControllers");

Router.get("/", controller.showAllComment)
  .get("/recipe/:id", controller.getCommentByRecipe)
  .post("/add", middlewares.checkToken, controller.addComment)
  .patch("/edit", middlewares.checkToken, controller.editComment)
  .delete("/delete", middlewares.checkToken, controller.deleteComment);
module.exports = Router;
