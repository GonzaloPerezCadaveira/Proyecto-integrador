const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../../src/controllers/api/controllerUsersApi");

// Middlewares

router.get('/users',userController.list)
router.get('/user/:id',userController.detail)



module.exports=router