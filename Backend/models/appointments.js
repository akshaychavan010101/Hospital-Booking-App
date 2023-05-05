module.exports = (sequelize, DataTypes) => {
  const appointments = sequelize.define("appointments", {
    patientName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "pending",
      Enumerator: ["pending", "approved", "rejected", "cancelled"],
    },
  });

  return appointments;
};
