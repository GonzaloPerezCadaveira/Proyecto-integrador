const express= require ("express");

const router = express.Router();

const userController = require("../controllers/controllerUsers");


router.get("/login", userController.login);
router.get("/register", userController.register);
router.post("/register", userController.nuevoUser)

module.exports = router;