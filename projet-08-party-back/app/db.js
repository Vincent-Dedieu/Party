const { Sequelize } = require('sequelize');

const PG_URL =
  process.env.PG_URL || 'postgres://party:party@localhost:5432/party';

const defineAttributes = {
  define: {
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const sequelize = new Sequelize(PG_URL, defineAttributes);

module.exports = sequelize;
