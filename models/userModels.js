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
      `INSERT INTO users (username, email, password, phone) VALUES ($1, $2, $3, $4) RETURNING *`,
      [props.username, props.email, props.password, props.phone],
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
      `UPDATE users SET username = $1, email = $2, password = $3, phone = $4, image = $5 WHERE id = $6`,
      [
        props.username,
        props.email,
        props.password,
        props.phone,
        props.image,
        props.id,
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

module.exports = {
  getAllUser,
  getUserById,
  getByEmail,
  addUser,
  editUser,
  deleteUser,
};
