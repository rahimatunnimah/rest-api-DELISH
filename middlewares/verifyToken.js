const jwt = require("jsonwebtoken");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(
      token.substring(7, token.length),
      // eslint-disable-next-line no-undef
      process.env.PRIVATE_KEY
    );

    if (decoded) {
      next();
    }
  } catch (error) {
    res.status(401).send("invalid token");
  }
};

module.exports = { checkToken };
