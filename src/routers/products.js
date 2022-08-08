const express= require ("express");

const router = express.Router();

const detailController = require("../controllers/controllerProduct");

const carritoController = require('../controllers/controllerProduct');


router.get("/:id", detailController.detail);

router.get('/:id/create',detailController.create);

router.post('/:id/create',detailController.store);

router.get('/carrito', carritoController.carrito);


module.exports= router;