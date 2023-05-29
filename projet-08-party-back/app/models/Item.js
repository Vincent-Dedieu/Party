const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Item extends Model {}

Item.init(
  {
    name: DataTypes.STRING(64),
    quantity: DataTypes.INTEGER,
  },
  {
    sequelize,
    tableName: 'item',
  }
);

module.exports = Item;
