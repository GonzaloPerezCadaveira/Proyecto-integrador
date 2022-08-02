const express= require ("express");

const router = express.Router();

const registerController = require ("../controllers/controllerRegister");

const loginController = require ("../controllers/controllerLogin");

router.get("/", loginController.login);

router.get("/", registerController.usuario);

module.exports= router;