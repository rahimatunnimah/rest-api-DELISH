const db = require("../config/db");

const getAllRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipes ORDER BY recipes.id ASC`,
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

const getNameRecipe = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipes WHERE name = $1`,
      [name],
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

const getRecipeById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
const getLatestRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recipes ORDER BY created_at DESC",
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

const addRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (name, ingredients, image, video, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [props.name, props.ingredients, props.image, props.video, props.user_id],
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

const editRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE recipes SET name = $1, ingredients = $2, image = $3, video = $4 WHERE id = $5`,
      [props.name, props.ingredients, props.image, props.video, props.id],
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

const deleteRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM recipes WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllRecipe,
  getNameRecipe,
  getLatestRecipe,
  addRecipe,
  editRecipe,
  getRecipeById,
  deleteRecipe,
};
