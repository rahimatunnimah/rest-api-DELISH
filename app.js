const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8000;
const cors = require("cors");

const router = require("./routes/index");

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
