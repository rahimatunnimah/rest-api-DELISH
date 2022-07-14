const model = require("../models/recipeModels");
const getRecipe = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const getData = await model.getAllRecipe(page, limit);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const getRecipeDetail = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getRecipeDetail(id);

    if (getData.rows.length === 0) {
      res.status(400).send("Data not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send("Something went wrong detail");
  }
};

const searchNameRecipe = async (req, res) => {
  try {
    const { name } = req.body;
    const getData = await model.getNameRecipe(name);
    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount,
    });
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const getLatestRecipe = async (req, res) => {
  try {
    const data = await model.getLatestRecipe();
    const max = 6;
    if (data) {
      res.send({ result: data.rows });
    } else {
      res.send({ data: (data.rows = max) });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong bhjkjh");
  }
};

const getRecipeWithComment = async (req, res) => {
  try {
    const getData = await model.getRecipeWithComment();
    if (getData.rowCount > 0) {
      res.send({ result: getData.rows });
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getRecipeByUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (Number(id)) {
      const getData = await model.getRecipeByUser(id);
      res.send({ data: getData.rows, jumlahData: getData.rowCount });
    } else {
      console.log(res);
      res.status(400).send("Parameter must be a number!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const addRecipe = async (req, res) => {
  try {
    const { name, ingredients, video, user_id } = req.body;
    const addRecipe = await model.addRecipe({
      name,
      ingredients,
      video,
      user_id,
      recipe_image: req.file.path,
    });

    if (addRecipe) {
      const bahan = addRecipe.rows[0].ingredients.split(",");

      res.send({
        message: "data added successfully",
        data: {
          name: name.trim(),
          ingredients: bahan,
          video,
          user_id,
          recipe_image: req.file.path,
        },
      });
    } else {
      res.status(400).send("data failed to add");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const editRecipe = async (req, res) => {
  try {
    const { name, ingredients, image, video, id } = req.body;

    const getData = await model.getRecipeById(id);
    if (getData.rowCount > 0) {
      let inputName = name || getData.rows[0].name;
      let inputIngredients = ingredients || getData.rows[0].ingredients;
      let inputImage = image || getData.rows[0].image;
      let inputVideo = video || getData.rows[0].video;

      let message = "";

      if (name) message += "name,";
      if (ingredients) message += "ingredients,";
      if (image) message += "image,";
      if (video) message += "video,";
      if (image) message += "image,";

      const editData = await model.editRecipe({
        name: inputName,
        ingredients: inputIngredients,
        image: inputImage,
        video: inputVideo,

        id,
      });
      if (editData) {
        res.send(`${message} successfully changed`);
      } else {
        res.status(400).send("data failed to change");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getRecipeById(id);
    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteRecipe(id);
      if (deleteUser) {
        res.send(`data id ${id} successfully deleted`);
      } else {
        res.status(400).send("data failed to delete");
      }
    } else {
      res.status(400).send("data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

module.exports = {
  getRecipe,
  getRecipeDetail,
  searchNameRecipe,
  getLatestRecipe,
  getRecipeWithComment,
  getRecipeByUser,
  addRecipe,
  editRecipe,
  deleteRecipe,
};
