const model = require("../models/recipeModels");
const cloudinary = require("../middlewares/cloudinary");

const getRecipe = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const getData = await model.getAllRecipe(page, limit);
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(400).send("Something went wrong detail");
  }
};

const searchNameRecipe = async (req, res) => {
  try {
    const { name } = req.query;
    const { page, limit } = req.query;
    if (name === "") {
      const getAll = await model.getAllRecipe(page, limit);
      res.send({
        data: getAll.rows,
        jumlahData: getAll.rowCount,
      });
    } else {
      const getData = await model.getNameRecipe(name);
      res.send({
        data: getData.rows,
        jumlahData: getData.rowCount,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send("something went wrong");
  }
};

const sortRecipeByCategory = async (req, res) => {
  try {
    const { category_name } = req.query;
    const getSortRecipe = await model.getRecipeByCategory(category_name);
    res.send({ data: getSortRecipe.rows, jumlahData: getSortRecipe.rowCount });
  } catch (error) {
    console.log(error);
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
    res.status(400).send("something went wrong");
  }
};

const getPopularRecipe = async (req, res) => {
  try {
    const data = await model.getPopularRecipe();
    const max = 5;
    if (data) {
      res.send({ result: data.rows, jumlahData: data.rowCount });
    } else {
      res.send({ data: (data.rows = max) });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getListPopularRecipe = async (req, res) => {
  try {
    const data = await model.getListPopularRecipe();
    if (data.rowCount > 0) {
      res.send({ result: data.rows, jumlahData: data.rowCount });
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
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
    const { name, ingredients, user_id, category_id } = req.body;
    const recipeCloud = await cloudinary.uploader.upload(req?.file?.path);
    const recipe_image = recipeCloud?.url;
    const addRecipe = await model.addRecipe({
      name,
      ingredients,
      user_id,
      category_id,
      recipe_image,
    });

    if (addRecipe) {
      const bahan = addRecipe.rows[0].ingredients.split(",");

      res.send({
        message: "data added successfully",
        data: {
          name: name.trim(),
          ingredients: bahan,
          user_id,
          category_id,
          recipe_image,
        },
      });
    } else {
      res.status(400).send("data failed to add");
    }
  } catch (error) {
    console.log(error);
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

const getVideoByRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const getVideo = await model.getVideoByRecipe(id);

    if (getVideo.rows.length === 0) {
      res.status(400).send("Data not found");
    } else {
      res.send({
        data: getVideo.rows,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const addVideoRecipe = async (req, res) => {
  try {
    const { video, recipe_id, user_id, description } = req.body;
    const addVideo = await model.addVideoRecipe({
      video,
      recipe_id,
      user_id,
      description,
    });
    if (addVideo) {
      res.send({
        message: "data added successfully",
        data: {
          video,
          recipe_id,
          user_id,
          description,
        },
      });
    } else {
      res.status(400).send("data failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const addCategoryRecipe = await model.addCategory({
      category_name,
    });

    if (addCategoryRecipe) {
      res.send({
        message: "category added successfully",
        data: {
          category_name: category_name.trim(),
        },
      });
    } else {
      res.status(400).send("category failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getCategory = async (req, res) => {
  try {
    const getData = await model.getAllCategory();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const editCategory = async (req, res) => {
  try {
    const { category_name, id } = req.body;

    const getData = await model.getCategoryById(id);
    if (getData.rowCount > 0) {
      let inputCategoryName = category_name || getData.rows[0].category_name;
      let message = "";

      if (category_name) message += "name,";

      const editData = await model.editCategory({
        category_name: inputCategoryName,
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

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getCategoryById(id);
    if (getData.rowCount > 0) {
      const deleteCategoryRecipe = await model.deleteCategory(id);
      if (deleteCategoryRecipe) {
        res.send(`category id ${id} successfully deleted`);
      } else {
        res.status(400).send("category failed to delete");
      }
    } else {
      res.status(400).send("category not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getListRecipeNameDesc = async (req, res) => {
  try {
    const data = await model.getSortRecipeNameDesc();
    if (data.rowCount > 0) {
      res.send({ result: data.rows, jumlahData: data.rowCount });
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getListRecipeNameAsc = async (req, res) => {
  try {
    const data = await model.getSortRecipeNameAsc();
    if (data.rowCount > 0) {
      res.send({ result: data.rows, jumlahData: data.rowCount });
    } else {
      res.status(404).send("Data not found");
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
  sortRecipeByCategory,
  getLatestRecipe,
  getPopularRecipe,
  getListPopularRecipe,
  getRecipeWithComment,
  getRecipeByUser,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getVideoByRecipe,
  addVideoRecipe,
  addCategory,
  getCategory,
  editCategory,
  deleteCategory,
  getListRecipeNameDesc,
  getListRecipeNameAsc,
};
