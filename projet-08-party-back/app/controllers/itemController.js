const { Item } = require("../models");

const itemController = {
   getOneItem: async (req, res) => {
      try {
         const itemId = req.params.id;
         const item = await Item.findByPk(itemId);
         if (!item) {
            res.status(404).json("Cant find item with id " + itemId);
         } else {
            res.json(item);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   getAllItem: async (req, res) => {
      try {
         const item = await Item.findAll();
         if (!item) {
            res.status(404).json("Cant find item API");
         } else {
            res.status(200).json(item);
         }
      } catch (error) {
         res.status(500).json(error);
      }
   },

   createItem: async (req, res) => {
      try {
         const userId = Number(req.user.id);
         const { name, quantity, event_id, category_id } = req.body;

         let bodyErrors = [];
         if (!name) {
            bodyErrors.push(`name can not be empty`);
         }
         if (!quantity) {
            bodyErrors.push(`quantity can not be empty`);
         }
         if (!event_id) {
            bodyErrors.push(`event_id can not be empty`);
         }

         if (!category_id) {
            bodyErrors.push(`category_id can not be empty`);
         }

         if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
         } else {
            let newItem = Item.build({
               name,
               quantity,
               event_id,
               user_id: userId,
               category_id,
            });

            await newItem.save();
            res.json(newItem);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   modifyItem: async (req, res) => {
      try {
         const itemId = req.params.id;
         const { name, quantity } = req.body;

         let item = await Item.findByPk(itemId);
         if (!item) {
            res.status(404).json(`Cant find item with id ${itemId}`);
         } else {
            if (name) {
               item.name = name;
            }
            if (quantity) {
               item.quantity = quantity;
            }
            await item.save();
            res.json(item);
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },

   deleteItem: async (req, res) => {
      try {
         const itemId = req.params.id;
         let item = await Item.findByPk(itemId);
         if (!item) {
            res.status(404).json(`Cant find item with id ${itemId}`);
         } else {
            await item.destroy();
            res.json("ok");
         }
      } catch (error) {
         console.trace(error);
         res.status(500).json(error);
      }
   },
};

module.exports = itemController;
