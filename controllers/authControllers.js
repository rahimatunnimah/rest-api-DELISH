const model = require("../models/userModels");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // search user
    const getUserByEmail = await model.getByEmail(email);

    if (getUserByEmail.rowCount) {
      // validate password
      const checkPasswrod = bcrypt.compareSync(
        password,
        getUserByEmail.rows[0].password
      ); // true or false

      if (checkPasswrod) {
        const token = jwt.sign(
          getUserByEmail.rows[0],
          // eslint-disable-next-line no-undef
          process.env.PRIVATE_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).send(token);
      } else {
        res.status(401).send("password tidak sesuai");
      }
    } else {
      res.status(400).send("user tidak terdaftar");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

module.exports = { login };
