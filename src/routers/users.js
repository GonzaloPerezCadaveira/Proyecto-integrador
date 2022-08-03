const express= require ("express");

const router = express.Router();

const registerController = require ("../controllers/controllerUsers");

const loginController = require ("../controllers/controllerUsers");

router.get("/", loginController.login);

router.get("/", registerController.usuario);

module.exports= router;