const Router = require("express").Router();
const controller = require("../controllers/commentController");

Router.get("/", controller.showAllComment)
  .post("/add", controller.addComment)
  .patch("/edit", controller.editComment)
  .delete("/delete", controller.deleteComment);
module.exports = Router;
