const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class User extends Model {}

User.init(
   {
      mail: DataTypes.STRING(64),
      lastname: DataTypes.STRING(64),
      firstname: DataTypes.STRING(64),
      password: DataTypes.STRING(255),
      image: DataTypes.TEXT,
   },
   {
      sequelize,
      tableName: "user",
   }
);

module.exports = User;
