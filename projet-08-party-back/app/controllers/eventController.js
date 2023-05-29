const { Event } = require("../models");
const { UserEvent } = require("../models");

const eventController = {
   getOneEvent: async (req, res) => {
      try {
         const eventId = req.params.id;
         const event = await Event.findByPk(eventId);
         if (!event) {
            res.status(404).json("Cant find event with id " + eventId);
         } else {
            if (event.password && event.user_id !== req.user.id) {
               if (!req.user) {
                  res.status(401).json(
                     "You need to be logged in to see this event"
                  );
                  return;
               }

               const userEvent = await UserEvent.findOne({
                  where: {
                     user_id: req.user.id,
                     event_id: event.id,
                  },
               });
               if (!userEvent) {
                  res.status(401).json(
                     "You are not authorized to see this event"
                  );
                  return;
               }
            }

            res.json(event);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   getAllEvent: async (req, res) => {
      try {
         const event = await Event.findAll();
         if (!event) {
            res.status(404).json("Cant find event API");
         } else {
            res.status(200).json(event);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   createEvent: async (req, res) => {
      try {
         const userId = Number(req.user.id);
         const {
            title,
            date,
            description,
            address,
            city,
            postal,
            password,
            //image,
         } = req.body;

         let bodyErrors = [];
         if (!title) {
            bodyErrors.push(`title can not be empty`);
         }
         if (!date) {
            bodyErrors.push(`date can not be empty`);
         }
         if (!description) {
            bodyErrors.push(`description can not be empty`);
         }
         if (!address) {
            bodyErrors.push(`address can not be empty`);
         }
         if (!city) {
            bodyErrors.push(`city can not be empty`);
         }
         if (!postal) {
            bodyErrors.push(`postal can not be empty`);
         }
         /* if (!image) {
            bodyErrors.push(`image can not be empty`);
         } */

         if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
         } else {
            const eventData = {
               title,
               date,
               description,
               address,
               city,
               postal,
               //image,
               user_id: userId,
            };

            if (password) {
               eventData.password = password;
            }

            let newEvent = Event.build(eventData);

            await newEvent.save();
            res.json(newEvent);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   modifyEvent: async (req, res) => {
      try {
         const eventId = req.params.id;
         const {
            title,
            date,
            description,
            address,
            city,
            postal,
            image,
            password,
         } = req.body;

         let event = await Event.findByPk(eventId);
         if (!event) {
            res.status(404).json(`Cant find event with id ${eventId}`);
         } else {
            if (title) {
               event.title = title;
            }
            if (date) {
               event.date = date;
            }
            if (description) {
               event.description = description;
            }
            if (address) {
               event.address = address;
            }
            if (city) {
               event.city = city;
            }
            if (postal) {
               event.postal = postal;
            }
            if (image) {
               event.image = image;
            }
            if (password) {
               event.password = password;
            }
            await event.save();
            res.json(event);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   deleteEvent: async (req, res) => {
      try {
         const eventId = req.params.id;
         let event = await Event.findByPk(eventId);
         if (!event) {
            res.status(404).json(`Cant find event with id ${eventId}`);
         } else {
            await event.destroy();
            res.status(204).json("ok");
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },
};

module.exports = eventController;
