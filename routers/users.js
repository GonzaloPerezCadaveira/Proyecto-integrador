const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../src/controllers/controllerUsers");

// Middlewares

const uploadFile = require('../src/middlewares/multerUsers')

const validationUser = require ("../src/middlewares/user")

const validations = require("../src/middlewares/validations")



// Formulario de Registro
router.get("/register", userController.register)

// Procesar el registro
router.post("/register", uploadFile.single('user_img'), validations, userController.store)

// Formulario de Login
router.get("/login", userController.login)

// Valida el ingreso de un usuario
router.post("/login", userController.log)

// Perfil de usuario
router.get("/user/profile", userController.profile)

module.exports = router;