const express= require ("express");

const router = express.Router();

const detailController = require ("../controllers/controllerProduct");


router.get("/:id", detailController.detail);

router.get('/create',detailController.create);

router.post('/create',detailController.store);

router.get('/carrito', detailController.carrito);

router.get('/:id/edit',detailController.edit)

router.put('/:id/actualizar',detailController.editComplete)

module.exports= router;