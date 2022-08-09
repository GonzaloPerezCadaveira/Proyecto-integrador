const express= require ("express");

const router = express.Router();

const productController = require("../controllers/controllerProduct");

router.get("/detail/:id", productController.detail);

router.get('/create',productController.create);

router.post('/create',productController.store);

router.get('/carrito', productController.carrito);

router.get('/edit/:id',productController.edit);

router.put('/actualizar/:id',productController.editComplete);

router.get('/delete/:id', productController.destroy)

module.exports= router;