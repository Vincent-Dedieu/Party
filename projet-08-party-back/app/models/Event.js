const { Model, DataTypes } = require("sequelize");
const sequelize = require("../db");

class Event extends Model {}

Event.init(
   {
      title: DataTypes.STRING(64),
      date: DataTypes.DATE,
      description: DataTypes.TEXT,
      address: DataTypes.STRING(64),
      city: DataTypes.STRING(64),
      postal: DataTypes.INTEGER,
      password: DataTypes.STRING(64),
      image: DataTypes.TEXT,
   },
   {
      sequelize,
      tableName: "event",
   }
);

module.exports = Event;
