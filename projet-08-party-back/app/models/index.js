const Event = require("./Event");
const Item = require("./Item");
const Category = require("./Category");
const User = require("./User");
const UserEvent = require("./UserEvent");
const sequelize = require("../db");

/* Associations */

// One-to-One : hasOne + belongsTo
// One-to-Many : hasMany + belongsTo
// Many-to-Many : belongsToMany (through) + belongsToMany (through)

// User <-> Event (One-To-Many)
User.hasMany(Event, {
   foreignKey: "user_id",
   as: "events",
});

Event.belongsTo(User, {
   foreignKey: "user_id",
   as: "user",
});

// Event <-> Item (One-To-Many)
Event.hasMany(Item, {
   foreignKey: "event_id",
});

Item.belongsTo(Event, {
   foreignKey: "event_id",
});

// User <-> Item (One-To-Many)
User.hasMany(Item, {
   foreignKey: "user_id",
   as: "itemsUser",
});

Item.belongsTo(User, {
   foreignKey: "user_id",
   as: "user",
});

// Category <-> Item (One-To-Many)
Category.hasMany(Item, {
   foreignKey: "category_id",
   as: "itemsCategory",
});

Item.belongsTo(Category, {
   foreignKey: "category_id",
   as: "category",
});

// User <-> Event (Many-To-Many)
User.belongsToMany(
   Event,
   { through: UserEvent }
   // foreignKey: 'user_id',
   // otherKey: 'event_id',
   // foreignKey: 'event_id',
   // otherKey: 'user_id',
   // as: 'eventsUser',
);

Event.belongsToMany(
   User,
   { through: UserEvent }
   // foreignKey: 'event_id',
   // otherKey: 'user_id',
   // foreignKey: 'user_id',
   // otherKey: 'event_id',

   // as: 'users',
);

module.exports = { User, Item, Category, Event, UserEvent };
