const { sequelize } = require("../config/db");
const Sequelize = require("sequelize");

const Doctors = sequelize.define("doctors", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  avatar: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  speciality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availability: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  fee: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = { Doctors };

