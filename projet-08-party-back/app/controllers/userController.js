const { User, Event, UserEvent } = require("../models");
const base64Img = require("base64-img");
const fs = require("fs");
const Jimp = require("jimp");

const userController = {
   getOneUser: async (req, res) => {
      try {
         const userId = req.params.id;
         const user = await User.findByPk(userId);
         if (!user) {
            res.status(404).json("Cant find User with id " + userId);
         } else {
            res.json(user);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   getAllUser: async (req, res) => {
      try {
         const user = await User.findAll();
         if (!user) {
            res.status(404).json("Cant find User API");
         } else {
            res.status(200).json(user);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   createUser: async (req, res) => {
      try {
         const { mail, lastname, firstname, password } = req.body;

         let bodyErrors = [];
         if (!mail) {
            bodyErrors.push(`mail can not be empty`);
         }
         if (!lastname) {
            bodyErrors.push(`lastname can not be empty`);
         }
         if (!firstname) {
            bodyErrors.push(`firstname can not be empty`);
         }
         if (!password) {
            bodyErrors.push(`password can not be empty`);
         }

         if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
         } else {
            let newUser = User.build({
               mail,
               lastname,
               firstname,
               password,
            });

            await newUser.save();
            res.json(newUser);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   modifyUser: async (req, res) => {
      try {
         const userId = req.params.id;
         const { mail, lastname, firstname, password, image } = req.body;

         if (image) {
            const image64 = {
               filename: `img-profil-${mail}`,
               base64: image,
            };
            const user = await User.findByPk(userId);

            // Vérifier si l'utilisateur a une image existante
            if (user.image) {
               const imagePath = `public/${user.mail}`;
               // Supprimer l'ancienne image
               fs.unlink(imagePath, (err) => {
                  if (err) {
                     console.error(err);
                  } else {
                     console.log(
                        `L'image précédente a été supprimée: ${imagePath}`
                     );
                  }
               });
            }

            // Convertir la base64 en fichier image et l'enregistrer dans le dossier public
            base64Img.img(
               image64.base64,
               "public",
               image64.filename,
               function (err, filepath) {
                  if (err) {
                     console.error(err);
                  } else {
                     console.log(
                        `L'image a été enregistrée avec succès sous ${filepath}`
                     );
                  }
               }
            );

            Jimp.read(`public/img-profil-${mail}.jpg`, function (err, image) {
               //If there is an error in reading the image,
               //we will print the error in our terminal
               if (err) {
                  console.log(err);
               }
               //Otherwise we convert the image into PNG format
               //and save it inside images folder using write() method.
               else {
                  image.write(`public/img-profil-${mail}.png`);
                  const imagePath = `public/img-profil-${mail}.jpg`;
                  // Supprimer l'ancienne image
                  fs.unlink(imagePath, (err) => {
                     if (err) {
                        console.error(err);
                     } else {
                        console.log(
                           `L'image précédente a été supprimée: ${imagePath}`
                        );
                     }
                  });
               }
            });
         }

         let user = await User.findByPk(userId);
         if (!user) {
            res.status(404).json(`Cant find User with id ${userId}`);
         } else {
            if (mail) {
               user.mail = mail;
            }
            if (lastname) {
               user.lastname = lastname;
            }
            if (firstname) {
               user.firstname = firstname;
            }
            if (password) {
               user.password = password;
            }

            if (image) {
               user.image = `http://localhost:3000/public/img-profil-${mail}.png`;
            }
            await user.save();
            res.json(user);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },
   // modifyUser: async (req, res) => {
   //    try {
   //       const userId = req.params.id;
   //       const { mail, lastname, firstname, password, image } = req.body;

   //       let user = await User.findByPk(userId);
   //       if (!user) {
   //          res.status(404).json(`Cant find User with id ${userId}`);
   //       } else {
   //          if (mail) {
   //             user.mail = mail;
   //          }
   //          if (lastname) {
   //             user.lastname = lastname;
   //          }
   //          if (firstname) {
   //             user.firstname = firstname;
   //          }
   //          if (password) {
   //             user.password = password;
   //          }

   //          if (image) {
   //             user.image = image;
   //          }

   //          await user.save();
   //          res.json(user);
   //       }
   //    } catch (error) {
   //       console.trace(error);
   //       res.status(500).json(error);
   //    }
   // },

   deleteUser: async (req, res) => {
      try {
         const userId = req.params.id;
         let user = await User.findByPk(userId);
         if (!user) {
            res.status(404).json(`Cant find User with id ${userId}`);
         } else {
            await user.destroy();
            res.json("ok");
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   getEventsUser: async (req, res) => {
      try {
         const userId = Number(req.user.id);
         const userEventsParticipating = await UserEvent.findAll(
            {
               where: {
                  user_id: userId,
               },
            },
            {
               include: Event,
            }
         );

         const eventsParticipating = [];

         userEventsParticipating.forEach(async (event) => {
            const eventParticipating = await Event.findByPk(
               event.dataValues.EventId
            );
            eventsParticipating.push(eventParticipating);
         });

         const eventOwning = await Event.findAll({
            where: {
               user_id: userId,
            },
         });

         const events = [...eventsParticipating, ...eventOwning];
         if (!events) {
            res.status(404).json("Cant find event with id " + userId);
         } else {
            res.json(events);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },
};

module.exports = userController;
