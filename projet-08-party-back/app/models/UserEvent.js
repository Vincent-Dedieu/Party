const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Event = require('./Event');

class UserEvent extends Model {}

UserEvent.init(
  {
    // on nomme les propriétés avec une majuscule pour pouvoir utiliser les méthodes de models générées automatiquement par sequelize => CardId au lieu de cardId
    EventId: {
      type: DataTypes.INTEGER,
      field: 'event_id',
      references: {
        model: Event,
        key: 'id',
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'event_has_user',
    timestamps: true,
  }
);

module.exports = UserEvent;
