

module.exports = (sequelize,DataTypes) =>{
    const user = sequelize.define("users",{
        name:DataTypes.STRING,
        email:DataTypes.STRING,
        mobile:DataTypes.INTEGER,
        password:DataTypes.STRING
    })
    return user;

}