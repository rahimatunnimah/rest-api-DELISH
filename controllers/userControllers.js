const model = require("../models/userModels");

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUser();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getUserById(id);

    if (getData.rows.length === 0) {
      res.send("user not found");
    } else {
      res.send({
        data: getData.rows,
      });
    }
  } catch (error) {
    res.status(400).send("Get data profile failed");
  }
};

const searchEmailUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const getData = await model.getByEmail(email);

    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount,
    });
    console.log(getData.rows);
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const editUser = async (req, res) => {
  try {
    const { username, email, password, phone, id } = req.body;
    const image = req.file.path;
    const getData = await model.getUserById(id);
    if (getData.rowCount > 0) {
      let inputUsername = username || getData.rows[0].username;
      let inputEmail = email || getData.rows[0].email;
      let inputPassword = password || getData.rows[0].password;
      let inputPhone = phone || getData.rows[0].phone;
      let inputImage = image || getData.rows[0].image;
      let message = "";

      if (username) message += "username,";
      if (email) message += "email,";
      if (password) message += "password,";
      if (phone) message += "phone,";
      if (image) message += "image,";

      const editData = await model.editUser({
        username: inputUsername,
        email: inputEmail,
        password: inputPassword,
        phone: inputPhone,
        image: inputImage,
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getUserById(id);
    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteUser(id);
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

const getAllLike = async (req, res) => {
  try {
    const getData = await model.getAllLike();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getLikedRecipe = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const getData = await model.getLikedRecipe(user_id);

    if (getData?.rows?.length === 0) {
      res.status(400).send("Data not found");
    } else {
      res.send({
        data: getData?.rows,
        jumlahData: getData?.rowCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong liked");
  }
};

const addLikeRecipe = async (req, res) => {
  try {
    const { recipe_id, user_id } = req.body;
    const addLike = await model.addLikeRecipe({
      recipe_id,
      user_id,
    });
    if (addLike) {
      res.send({
        message: "like added successfully",
        data: {
          recipe_id,
          user_id,
        },
      });
    } else {
      res.status(400).send("like failed to add");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deleteLikeRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getLikeById(id);
    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteLikeRecipe(id);
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

const getAllSave = async (req, res) => {
  try {
    const getData = await model.getAllSave();
    res.send({ data: getData.rows, jumlahData: getData.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const getSavedRecipe = async (req, res) => {
  try {
    const user_id = parseInt(req.params.id);
    const getData = await model.getSavedRecipe(user_id);

    if (getData?.rows?.length === 0) {
      res.status(400).send("Data not found");
    } else {
      res.send({
        data: getData?.rows,
        jumlahData: getData?.rowCount,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong liked");
  }
};

const addSaveRecipe = async (req, res) => {
  try {
    const { recipe_id, user_id } = req.body;
    const addSave = await model.addSaveRecipe({
      recipe_id,
      user_id,
    });
    if (addSave) {
      res.send({
        message: "save added successfully",
        data: {
          recipe_id,
          user_id,
        },
      });
    } else {
      res.status(400).send("save failed to add");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deleteSaveRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getSaveById(id);
    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteSaveRecipe(id);
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
  getUsers,
  getUserById,
  editUser,
  deleteUser,
  searchEmailUsers,
  getAllLike,
  getLikedRecipe,
  addLikeRecipe,
  deleteLikeRecipe,
  getAllSave,
  getSavedRecipe,
  addSaveRecipe,
  deleteSaveRecipe,
};
