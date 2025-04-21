// const mongoose = require("mongoose");
// require("dotenv").config();

// const connection = mongoose.connect(process.env.MONGO_URL);

//-------------- Sequelize ------------------

const Sequelize = require("sequelize");

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.SQL_DATABASENAME,
  process.env.SQL_USERNAME,
  process.env.SQL_PASSWORD,
  {
    host: process.env.SQL_HOST,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        "rejectUnauthorized": false
      },
    },
  }
);

module.exports = { sequelize };
