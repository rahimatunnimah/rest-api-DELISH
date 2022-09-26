const Router = require("express").Router();
const middlewares = require("../middlewares/verifyToken");
const controller = require("../controllers/userControllers");
const userUpload = require("../middlewares/uploadProfile");

Router.get("/", controller.getUsers)
  .get("/:id", middlewares.checkToken, controller.getUserById)
  .get("/search/email", controller.searchEmailUsers)
  .patch("/edit", middlewares.checkToken, controller.editUser)
  .patch(
    "/edit/photo",
    middlewares.checkToken,
    userUpload,
    controller.editProfileUser
  )
  .delete("/delete", middlewares.checkToken, controller.deleteUser)
  .get("/like/recipe", controller.getAllLike)
  .get("/liked/recipe/:id", middlewares.checkToken, controller.getLikedRecipe)
  .post("/add/like", middlewares.checkToken, controller.addLikeRecipe)
  .delete("/delete/like", middlewares.checkToken, controller.deleteLikeRecipe)
  .get("/save/recipe", controller.getAllSave)
  .get("/saved/recipe/:id", middlewares.checkToken, controller.getSavedRecipe)
  .post("/add/save", middlewares.checkToken, controller.addSaveRecipe)
  .delete("/delete/save", middlewares.checkToken, controller.deleteSaveRecipe);

module.exports = Router;
