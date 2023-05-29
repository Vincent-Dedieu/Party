const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Category extends Model {}

Category.init(
  {
    name: DataTypes.STRING(64),
  },
  {
    sequelize,
    tableName: 'category',
  }
);

module.exports = Category;
