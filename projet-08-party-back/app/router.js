const express = require("express");
const path = require("path");
const { authenticateToken } = require("./middlewares");
/* -------------- Controllers -------------- */

const userAuthController = require("./controllers/userAuthController");
const eventController = require("./controllers/eventController");
const eventUserController = require("./controllers/eventUserController");
const eventItemController = require("./controllers/eventItemController");
const userController = require("./controllers/userController");
const itemController = require("./controllers/itemController");

/* -------------- Routes -------------- */

const router = express.Router();


/** Event **/
router.post(
   "/event/:id/request-access",
   authenticateToken,
   eventUserController.requestAddUserToEvent
);
router.get("/event", authenticateToken, eventController.getAllEvent);
router.get("/event/:id", authenticateToken, eventController.getOneEvent);
router.post("/event", authenticateToken, eventController.createEvent);
router.put("/event/:id", authenticateToken, eventController.modifyEvent);
router.delete("/event/:id", authenticateToken, eventController.deleteEvent);

// router.get("/event", eventController.getAllEvent);
// router.get("/event/:id", eventController.getOneEvent);
// router.post("/event", eventController.createEvent);
// router.put("/event/:id", eventController.modifyEvent);
// router.delete("/event/:id", eventController.deleteEvent);

// /** Event > User **/
router.get("/event/:eventId/users", eventUserController.getUsersEvent);
router.post("/event/:eventId/users", eventUserController.addUserEvent);
router.delete(
   "/event/:eventId/users/:userId",
   eventUserController.deleteUserEvent
);

// /** Event > Item **/
router.get("/event/:eventId/item", eventItemController.getItemEvent);
router.post("/event/:eventId/item", eventItemController.addItemEvent);

// /**  User **/
router.get("/user", userController.getAllUser);
router.get("/user/:id", userController.getOneUser);
// router.get("/user/:userId/events", userController.getEventsUser);
router.get("/me/events", authenticateToken, userController.getEventsUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.modifyUser);
router.delete("/user/:id", userController.deleteUser);

// /**  Item **/
router.get("/item/:id", itemController.getOneItem);
router.get("/item", itemController.getAllItem);
router.post("/item", authenticateToken, itemController.createItem);
router.put("/item/:id", itemController.modifyItem);
router.delete("/item/:id", itemController.deleteItem);

/** Authentification */

router.post("/signup", userAuthController.handleSignupFormSubmission);
router.post("/login", userAuthController.handleLoginFormSubmission);

module.exports = router;
