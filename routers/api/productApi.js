const express= require ("express");

const router = express.Router();

// Controller

const userController = require("../../src/controllers/api/controllerProductApi");

// Middlewares

router.get('/products',userController.list)
router.get('/product/:id',userController.detail)



module.exports=router