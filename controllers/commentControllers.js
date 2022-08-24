const model = require("../models/commentModels");

const showAllComment = async (req, res) => {
  try {
    const getData = await model.getAllData();
    if (getData.rowCount > 0) {
      res.send(getData.rows);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};
const getCommentByRecipe = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getData = await model.getCommentByRecipe(id);

    res.send({
      data: getData.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Something wrong, get recipe comment fail!");
  }
};

const addComment = async (req, res) => {
  try {
    const { comment, recipe_id, user_id } = req.body;
    const insertComment = await model.addComment({
      comment,
      recipe_id,
      user_id,
    });
    if (insertComment) {
      res.send(insertComment.rows);
    } else {
      res.status(400).send("data failed to add");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

const editComment = async (req, res) => {
  try {
    const { id, comment } = req.body;
    const checkData = await model.getCommentById(id);
    if (checkData.rowCount > 0) {
      let inputComment = comment || checkData.rows[0].comment;
      const updateData = await model.editComment(inputComment, id);
      if (updateData) {
        res.send("Data has been change successfully");
      } else {
        res.status(400).send("Data failed to change");
      }
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    res.status(400).send("something went wrong");
  }
};

const deleteComment = async (req, res) => {
  try {
    const { id } = req.body;
    const getData = await model.getCommentById(id);
    if (getData.rowCount > 0) {
      const deleteUser = await model.deleteComment(id);
      if (deleteUser) {
        res.send(`comment deleted successfully`);
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
  showAllComment,
  getCommentByRecipe,
  addComment,
  editComment,
  deleteComment,
};
