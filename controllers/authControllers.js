const model = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    const image =
      "https://res.cloudinary.com/df9tcvnrs/image/upload/v1663258145/samples/chef_dbig04.png";
    const salt = bcrypt.genSaltSync(15);
    const hash = bcrypt.hashSync(password, salt);
    const checkEmail = await model.getByEmail(email);

    if (checkEmail.rowCount > 0) {
      res.status(401).send("duplicate email");
    } else {
      await model.addUser({
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hash,
        phone: phone.trim(),
        image,
      });
      res.send({
        message: "Register user successfully",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("something went wrong");
  }
};

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

        res.status(200).send({
          user: { ...getUserByEmail?.rows[0], password: null },
          token,
        });
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

module.exports = { login, register };
