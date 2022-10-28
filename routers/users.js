const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../src/controllers/controllerUsers");

// Middlewares


const uploadFile = require('../src/middlewares/multerUsers')

const validationLogin = require ("../src/middlewares/validationsLogin")

const validationsRegister = require("../src/middlewares/validationsRegister")

const autentificacion=require('../src/middlewares/auth')

const userOn = require('../src/middlewares/userConnected')





// Formulario de Registro
router.get("/register", userOn, userController.register)

// Procesar el registro
router.post("/register", uploadFile.single('user_img'), validationsRegister, userController.store)

// Formulario de Login
router.get("/login", userOn, userController.login)

// Valida el ingreso de un usuario
router.post("/login", validationLogin, userController.loginSucces)

// Perfil de usuario
router.get("/profile", autentificacion, userController.profile)

router.get('/logout', userController.logout)

module.exports = router;