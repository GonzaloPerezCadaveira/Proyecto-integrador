const express= require ("express");

const router = express.Router();

const registerController = require ("../controllers/controllerRegister");

router.get("/", registerController.usuario);

module.exports= router;