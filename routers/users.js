const express= require ("express");

const router = express.Router();

const userController = require("../src/controllers/controllerUsers");


router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/register", userController.nuevoUser)
router.post("/login",userController.validateUser)

module.exports = router;