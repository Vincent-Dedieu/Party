/* ---------- DotEnv ---------- */
const dotenv = require("dotenv");
dotenv.config();

/* ---------- Express ---------- */

const express = require("express");
const router = require("./app/router");
const cors = require("cors");
const multer = require("multer");
const bodyParser = multer();
const middlewares = require("./app/middlewares");
const path = require("path");

const PORT = process.env.PORT || 3000;
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

/* ---------- Middlewares ---------- */
app.use(cors("*")); // On autorise tout les domaines à faire du Cross Origin Resource Sharing.
app.use(bodyParser.none());
app.use(middlewares.bodySanitizer);
app.use(router);

app.use(express.static("assets"));

app.use(middlewares.notFoundMiddleware);

/* ---------- App ---------- */

app.listen(PORT, () => {
   console.log(`Listening on ${PORT} ...`);
});
