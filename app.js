const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
// eslint-disable-next-line no-undef
const port = process.env.PORT || 8001;
const cors = require("cors");
const multer = require("multer");

const router = require("./routes/index");

app.use(helmet());

const forms = multer();

app.use(bodyParser.json());
app.use(forms.array());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
const allowlist = ["https://localhost:3001"];
const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use("/api", cors(corsOptionsDelegate), router);

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`App is running on port ${port}`);
});
