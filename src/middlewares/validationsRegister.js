const { body }= require('express-validator');
const path= require('path')


const validation = [
    body('user_name').notEmpty().withMessage('Debes escribir un nombre y apellido completo').bail()
    .isLength({min:3}).withMessage('Este campo no admite menos de 3 caracteres'),
    body('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email').bail(),
    body('user_password').notEmpty().withMessage('Debes escribir una contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    body('user_img').custom(function(value,{req}){
        let file = req.file;
        const acceptedFiles = ['.jpeg', '.jpg', '.png'];
        if(!file){
            throw new Error('Tienes que subir una imagen para poder registrarte')
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