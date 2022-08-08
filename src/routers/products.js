const express= require ("express");

const router = express.Router();

const productController = require("../controllers/controllerProduct");

router.get("/:id", productController.detail);

router.get('/create',productController.create);

router.post('/create',productController.store);

router.get('/carrito', productController.carrito);

router.get('/:id/edit',productController.edit)

router.put('/:id/actualizar',productController.editComplete)

module.exports= router;