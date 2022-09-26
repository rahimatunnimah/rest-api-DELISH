const db = require("../config/db");

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users ORDER BY users.id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
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

const addUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO users (username, email, password, phone, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [props.username, props.email, props.password, props.phone, props.image],
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

const editUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET username = $1, email = $2, password = $3, phone = $4 WHERE id = $5`,
      [props.username, props.email, props.password, props.phone, props.id],
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

const editProfileUser = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE users SET image = $1 WHERE id = $2`,
      [props.image, props.id],
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

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM users WHERE id = $1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getAllLike = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM liked_recipe`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getLikeById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM liked_recipe WHERE id = $1`,
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

const getLikedRecipe = (user_id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT L.*, R.name, R.recipe_image, C.category_name
              FROM liked_recipe L 
              LEFT JOIN recipes R ON L.recipe_id = R.id
              LEFT JOIN category_recipe C ON R.category_id = C.id
              WHERE L.user_id = $1`,
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

const addLikeRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO liked_recipe (recipe_id, user_id) VALUES ($1, $2) RETURNING *`,
      [props.recipe_id, props.user_id],
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

const deleteLikeRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM liked_recipe WHERE id = $1`,
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

const getAllSave = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM saved_recipe`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const getSaveById = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM saved_recipe WHERE id = $1`,
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

const getSavedRecipe = (user_id) =>
  new Promise((resolve, reject) => {
    db.query(
      `SELECT S.*, R.name, R.recipe_image, C.category_name
              FROM saved_recipe S 
              LEFT JOIN recipes R ON S.recipe_id = R.id
              LEFT JOIN category_recipe C ON R.category_id = C.id
              WHERE S.user_id = $1`,
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

const addSaveRecipe = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO saved_recipe (recipe_id, user_id) VALUES ($1, $2) RETURNING *`,
      [props.recipe_id, props.user_id],
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

const deleteSaveRecipe = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM saved_recipe WHERE id = $1`,
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

module.exports = {
  getAllUser,
  getUserById,
  getByEmail,
  addUser,
  editUser,
  editProfileUser,
  deleteUser,
  getAllLike,
  getLikeById,
  getLikedRecipe,
  addLikeRecipe,
  deleteLikeRecipe,
  getAllSave,
  getSaveById,
  getSavedRecipe,
  addSaveRecipe,
  deleteSaveRecipe,
};
