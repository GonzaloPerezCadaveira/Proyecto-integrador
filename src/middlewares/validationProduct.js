const { check }= require('express-validator');
const path= require('path')


const validation = [
    check('name').notEmpty().withMessage('Debe asignarle un nombre al producto').bail()
    .isLength({min:5}).withMessage('El nombre del producto debe tener al menos 5 caracteres').bail(),
    check('description').trim().isLength({min:20}).withMessage('La descripcion del producto debera tener como minimo 20 caracteres').bail(),
    // check('cat_id').custom(function(value) {
    //     if(!value){
    //         throw new Error('Debes seleccionar una opcion')
    //     }
    //     else{
    //         return true
    //     }
    // }).bail(),
    check('img').custom(function(value,{req}){
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