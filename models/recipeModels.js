const db = require("../config/db");

const getAllRecipe = (page, limit) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT R.*, C.category_name, U.username
        FROM recipes R INNER JOIN category_recipe C ON R.category_id = C.id 
        INNER JOIN users U ON R.user_id = U.id 
        ORDER BY R.id DESC 
        LIMIT $2 OFFSET (($1 - 1) * $2)`,
      [page, limit],
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

const getNameRecipe = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT R.*, C.category_name FROM recipes R INNER JOIN category_recipe C ON R.category_id = C.id WHERE name ~* $1`,
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

const getLatestRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM recipes ORDER BY created_at DESC LIMIT 6`,
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

const getPopularRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT L.recipe_id, R.name, R.ingredients, R.recipe_image, C.category_name, COUNT(*) AS total
        FROM liked_recipe L INNER JOIN recipes R ON L.recipe_id = R.id  INNER JOIN category_recipe C 
        ON R.category_id = C.id GROUP BY L.recipe_id, R.name, R.ingredients, R.recipe_image, C.category_name 
        ORDER BY total DESC LIMIT 5`,
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

const getListPopularRecipe = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT L.recipe_id, R.name, R.ingredients, R.recipe_image, C.category_name, COUNT(*) AS total
        FROM liked_recipe L INNER JOIN recipes R ON L.recipe_id = R.id  INNER JOIN category_recipe C 
        ON R.category_id = C.id GROUP BY L.recipe_id, R.name, R.ingredients, R.recipe_image, C.category_name 
        ORDER BY total DESC`,
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

const getRecipeWithComment = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.id, recipes.name, recipes.ingredients, comment.id ,comment.recipe_id, comment.comment
      FROM recipes INNER JOIN comment ON recipes.id = comment.recipe_id ORDER BY recipes.id`,
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

const getRecipeByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT R.*, C.category_name FROM recipes R INNER JOIN category_recipe C ON R.category_id = C.id WHERE user_id = $1`,
      [user_id],
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

const getRecipeDetail = (id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT recipes.*, users.username
              FROM recipes
              INNER JOIN users
              ON recipes.user_id = users.id
              WHERE recipes.id = $1`,
      [id],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });

const addRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO recipes (name, ingredients, recipe_image, user_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [
        props.name,
        props.ingredients,
        props.recipe_image,
        props.user_id,
        props.category_id,
      ],
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

const getVideoByRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM videos WHERE recipe_id = $1`,
      [id],
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

const addVideoRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO videos (video, recipe_id, user_id, description) VALUES ($1, $2, $3, $4) RETURNING *`,
      [props.video, props.recipe_id, props.user_id, props.description],
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

module.exports = {
  getAllRecipe,
  getRecipeById,
  getNameRecipe,
  getLatestRecipe,
  getPopularRecipe,
  getListPopularRecipe,
  getRecipeWithComment,
  getRecipeByUser,
  getRecipeDetail,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getVideoByRecipe,
  addVideoRecipe,
};
