const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../src/controllers/controllerUsers");

// Middlewares


const uploadFile = require('../src/middlewares/multerUsers')

const validationLogin = require ("../src/middlewares/validationsLogin")

const validationsRegister = require("../src/middlewares/validationsRegister")

const validationsEdit = require("../src/middlewares/validationEditUsers")

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
// Vista de edición de usuario
router.get('/edit/:id',userController.edit)
// Procesa la edición del usuario
router.put('/actualizar/:id', uploadFile.single('user_img'), validationsEdit,userController.editSucces)
// Cierra la sesión del usuario
router.get('/logout', userController.logout)
// Desde el perfil del usuario administrador, acccede a la lista de usuarios registrados
router.get('/userslist', userController.usersList)
// Borra el usuario seleccionado
router.delete('/delete/:id', userController.destroy); 

module.exports = router;