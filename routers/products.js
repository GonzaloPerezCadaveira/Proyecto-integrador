const express= require ("express");
const multer = require ('multer')
const router = express.Router();
const path = require ('path')


const validacionImg= require('../src/middlewares/multerProduct')
const validationProduct = require('../src/middlewares/validationProduct')
const userAdmin = require('../src/middlewares/restriccionProdUsers')
const productController = require("../src/controllers/controllerProduct");


// Creación de producto (C)
router.get('/create', productController.create);

router.post('/create', validacionImg.single('img'),validationProduct, productController.store);

// Listado de productos (R)
router.get('/', productController.productsList)

// Detalle de producto
router.get("/detail/:id", userAdmin, productController.detail);

// Actualización de producto (U)
router.get('/edit/:id', function (req,res,next) {
    console.log('sigo andando')
    next()
} ,productController.edit);

router.put('/actualizar/:id', validacionImg.single('img'),validationProduct , productController.editComplete);

// Borrado de producto (D)
router.delete('/delete/:id', productController.destroy); 


router.get('/carrito', productController.carrito);


module.exports= router;