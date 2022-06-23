/* eslint-disable no-undef */
const Postgre = require("pg").Pool;
require("dotenv").config();

const connection = new Postgre({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const connect = async () => {
  try {
    const response = await connection.connect();
    if (response) console.log("Connect to database");
  } catch (err) {
    console.log(err);
  }
};

connect();
module.exports = connection;
