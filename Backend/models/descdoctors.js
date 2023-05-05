module.exports = (sequelize, DataTypes) => {
    const Descdoctors = sequelize.define("descdoctors", {
      education: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Professional: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Certifications: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Expertise: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Honors_and_Awards: {
        type: DataTypes.STRING,
        allowNull:false
      },
      Publications: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Professional_Memberships: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      doctor_id:{
        type:DataTypes.STRING,
        allowNull:false
      },
    });
  
    return Descdoctors;
  };