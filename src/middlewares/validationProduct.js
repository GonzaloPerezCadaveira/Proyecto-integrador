const { body }= require('express-validator');
const path= require('path')


const validation = [
    body('name').notEmpty().withMessage('Debe asignarle un nombre al producto').bail()
    .isLength({min:5}).withMessage('El nombre del producto debe tener al menos 5 caracteres').bail(),
    body('description').trim().isLength({min:20}).withMessage('La descripcion del producto debera tener como minimo 20 caracteres').bail(),
    // body('cat_id').custom(function(value) {
    //     if(!value){
    //         throw new Error('Debes seleccionar una opcion')
    //     }
    //     else{
    //         return true
    //     }
    // }).bail(),
    body('img').custom(function(value,{req}){
        let file = req.file;
        const acceptedFiles = ['.jpeg', '.jpg', '.png'];
        if(!file){
            throw new Error('Tienes que subir una imagen del producto')
        }
        else{
            const fileExtension = path.extname(file.originalname)
            if(!acceptedFiles.includes(fileExtension)){
                throw new Error('El formato de la imagen no esta permitido')
            }
        }
        return true
    }).bail()

]

module.exports = validation;