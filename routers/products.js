const express= require ("express");
const multer = require ('multer')
const router = express.Router();
const path =require ('path')
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

const upload = multer({storage});


router.get("/detail/:id", productController.detail);

router.get('/create',productController.create);

router.post('/create', upload.single('img') ,productController.store);

router.get('/carrito', productController.carrito);

router.get('/edit/:id',productController.edit);

router.put('/actualizar/:id',productController.editComplete);

router.get('/delete/:id', productController.destroy)

module.exports= router;