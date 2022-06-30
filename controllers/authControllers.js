const model = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const getUserByEmail = await model.getByEmail(email);
    if (getUserByEmail.rowCount) {
      const checkPasswrod = bcrypt.compareSync(
        password,
        getUserByEmail.rows[0].password
      );

      if (checkPasswrod) {
        const token = jwt.sign(
          getUserByEmail.rows[0],
          // eslint-disable-next-line no-undef
          process.env.PRIVATE_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).send(token);
      } else {
        res.status(401).send("invalid password");
      }
    } else {
      res.status(400).send("user not register");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

module.exports = { login };
