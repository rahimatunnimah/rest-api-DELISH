const Router = require("express").Router();
const controller = require("../controllers/recipeControllers");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

Router.get("/", controller.getRecipe)
  .get("/search/name", controller.searchNameRecipe)
  .get("/latest", controller.getLatestRecipe)
  .get("/comment", controller.getRecipeWithComment)
  .get("/user/:id", controller.getRecipeByUser)
  .post("/add", upload.single("image"), controller.addRecipe)
  .patch("/edit", controller.editRecipe)
  .delete("/delete", controller.deleteRecipe);

module.exports = Router;
