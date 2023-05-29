const { User } = require("../models");
const emailValidator = require("email-validator");
const passwordPolicy = require("../models/passwordPolicy");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(user) {
   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "18000s",
   });
}

const userAuthController = {
   async handleSignupFormSubmission(req, res) {
      //Récupérer les infos envoyées par l'user dans le req.body
      //console.log(req.body);
      const {
         firstname,
         lastname,
         mail,
         password,
         confirmation: confirmationPassword,
      } = req.body;
      //console.log(firstname, lastname, mail, password);
      //La première étape : vérifier que tous les champs sont présents
      if (!firstname || !lastname || !mail || !password) {
         return res.json("Veuillez renseigner tous les champs");
      }
      //Vérifier la validité de l'email
      if (!emailValidator.validate(mail)) {
         return res.json("Cet email n'est pas valide");
      }

      //Vérifier que le password corresponde à la confirmation
      if (password !== confirmationPassword) {
         return res.json("Les mots passes fournis ne sont pas identiques");
      }
      //Vérifier si l'user existe avec l'adresse mail
      const existingUserWithSameEmail = await User.findOne({ where: { mail } });
      if (existingUserWithSameEmail) {
         return res.json("Cet email est déjà utilisé");
      }

      //Vérifier que le password réponde bien à une police de mot de passe
      if (!passwordPolicy.validate(password)) {
         return res.json(
            "Le mot de passe doit contenir au minimum 6 caractères"
         );
      }
      //On hash le mot de passe
      const saltRounds = 10; // Rapport temps/efficacité. Quand on hash un password, bcrypt va effectuer un certain nombre de tours (2^saltRounds) pour générer un hash sécurisé
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt); // pour illustrer un hash : password1235  =>  $2b$10$nOUIs5kJ7naTuTFkBy1veuK0kSxUFXfuaOKdOKf9xYT0KKIGSJwFa

      //Créer un utilisateur en db
      await User.create({
         firstname,
         lastname,
         mail,
         password: hashedPassword,
      });
      res.json("Utilisateur créé");
   },

   async handleLoginFormSubmission(req, res) {
      const { mail, password } = req.body;

      //Plan d'action
      //Vérifier que les champs ne soient pas nuls
      if (!mail || !password) {
         return res.status(401).json("Veuillez renseigner tous les champs");
      }
      //Trouver dans la BDD un email qui correspond à l'email fourni dans le form par l'utilisateur
      const user = await User.findOne({ where: { mail } });
      if (!user) {
         return res
            .status(401)
            .json("La paire utilisateur/mot de passe est invalide");
      }

      //Comparer le mot de passe avec le hash dans la BDD
      const isMatchingPassword = await bcrypt.compare(password, user.password);
      //Condition : Si le hash et le mdp ne correspondent pas, on retourne une erreur sur la view
      if (!isMatchingPassword) {
         return res.status(401).json("Mot de passe est invalide");
      }

      //Il va falloir envoyer un JWT
      const payload = {
         id: user.id,
         firstname: user.firstname,
         lastname: user.lastname,
         mail: user.mail,
      };
      const accessToken = generateAccessToken(payload);
      console.log("accessToken", accessToken);
      res.json({
         accessToken,
         payload,
      });
   },
};

module.exports = userAuthController;
