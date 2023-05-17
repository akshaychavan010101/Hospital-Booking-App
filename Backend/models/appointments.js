const { sequelize } = require("../config/db");
const Sequelize = require("sequelize");

const Appointments = sequelize.define("appointments", {
  patientName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  doctorName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  patientId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  doctorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: "pending",
    Enumerator: ["pending", "approved", "rejected", "cancelled"],
  },
  isNotified: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = { Appointments };
