const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../../src/controllers/api/controllerUsersApi");

const productController = require("../../src/controllers/api/controllerProductApi");

// Middlewares

router.get('/products',productController.list)
router.get('/product/:id',productController.detail)


router.get('/users',userController.list)
router.get('/user/:id',userController.detail)



module.exports=router