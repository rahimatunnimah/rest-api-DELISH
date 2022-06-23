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

const addUser = async (req, res) => {
  try {
    const { username, email, password, phone, image } = req.body;
    const addUser = await model.addUser({
      username,
      email,
      password,
      phone,
      image,
    });
    if (addUser) {
      res.send("data added successfully");
    } else {
      console.log(res);
      res.status(400).send("data failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const editUser = async (req, res) => {
  try {
    const { username, email, password, phone, image, id } = req.body;

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

module.exports = { getUsers, addUser, editUser, deleteUser };
