const { Event, Item } = require('../models');

const eventItemController = {
  getItemEvent: async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const event = await Event.findByPk(eventId, { include: Item });
      if (!event) {
        res.status(404).json('Cant find event with id ' + eventId);
      } else {
        res.json(event);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  addItemEvent: async (req, res, next) => {
    const eventId = Number(req.params.eventId);
    const itemId = Number(req.body.itemId);

    const event = await Event.findByPk(eventId, { include: Item });
    const item = await Item.findByPk(itemId);

    if (!event || !item) {
      return next();
    }

    await event.addItem(item);
    await event.reload();
    res.json(event);
  },
};

module.exports = eventItemController;
