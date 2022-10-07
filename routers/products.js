const express= require ("express");
const multer = require ('multer')
const router = express.Router();
const path = require ('path')


const validacionImg= require('../src/middlewares/multerProduct')
const productController = require("../src/controllers/controllerProduct");

const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.join(__dirname,'../public/image'));
    },
    filename:(req,file,cb)=>{
        console.log(file);
        const newFile = 'img'+ Date.now() + path.extname(file.originalname) ;
        cb(null, newFile);
    }
})

const upload = multer({storage:storage});

// Creación de producto (C)
router.get('/create', productController.create);

router.post('/create', validacionImg.single('img'), productController.store);

// Listado de productos (R)
router.get('/', productController.productsList)

// Detalle de producto
router.get("/:id", productController.detail);

// Actualización de producto (U)
router.get('/edit/:id', productController.edit);

router.put('/actualizar/:id', validacionImg.single('img'), productController.editComplete);

// Borrado de producto (D)
router.delete('/delete/:id', productController.destroy); 


router.get('/carrito', productController.carrito);


module.exports= router;