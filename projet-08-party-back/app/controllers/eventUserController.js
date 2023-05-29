const { Event, User, UserEvent } = require("../models");

const eventUserController = {
   getUsersEvent: async (req, res) => {
      try {
         const eventId = req.params.eventId;
         const event = await Event.findByPk(eventId, { include: User });
         if (!event) {
            res.status(404).json("Cant find event with id " + eventId);
         } else {
            res.json(event);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },
   requestAddUserToEvent: async (req, res, next) => {
      const eventId = Number(req.params.id);
      const userId = Number(req.user.id);
      const password = req.body.password;

      const event = await Event.findByPk(eventId, { include: User });

      const userEvent = await UserEvent.findOne({
         where: {
            user_id: userId,
            event_id: eventId,
         },
      });

      if (userEvent) {
         return res.status(401).json("You are already in this event");
      }

      if (event.password !== password) {
         return res.status(401).json("Wrong password");
      }

      const user = await User.findByPk(userId);

      if (!event || !user) {
         return next();
      }

      await event.addUser(user);
      await event.reload();
      res.json(event);
   },
   addUserEvent: async (req, res, next) => {
      const eventId = Number(req.params.eventId);
      const userId = Number(req.body.userId);

      const event = await Event.findByPk(eventId, { include: User });
      const user = await User.findByPk(userId);

      if (!event || !user) {
         return next();
      }

      await event.addUser(user);
      await event.reload();
      res.json(event);
   },

   deleteUserEvent: async (req, res, next) => {
      const eventId = Number(req.params.eventId);
      const userId = Number(req.params.userId);

      const event = await Event.findByPk(eventId, { include: User });
      const user = await User.findByPk(userId);

      if (!event || !user) {
         return next();
      }
      await event.removeUser(user);
      await event.reload();
      res.json(event);
   },
};

module.exports = eventUserController;
