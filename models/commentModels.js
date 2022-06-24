const db = require("../config/db");

const getAllData = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comment ORDER BY id", (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const getCommentById = (id) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM comment WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const addComment = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO comment (comment, recipe_id) VALUES ($1, $2) RETURNING *`,
      [props.comment, props.recipe_id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
const editComment = (value, id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE comment SET comment = $1 WHERE id = $2",
      [value, id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const deleteComment = (id) => {
  return new Promise((resolve, reject) => {
    db.query("DELETE FROM comment WHERE id = $1", [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllData,
  getCommentById,
  addComment,
  editComment,
  deleteComment,
};
