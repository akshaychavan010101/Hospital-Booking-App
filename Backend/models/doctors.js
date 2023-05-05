module.exports = (sequelize, DataTypes) => {
  const doctors = sequelize.define("doctors", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    availability: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fee: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return doctors;
};
