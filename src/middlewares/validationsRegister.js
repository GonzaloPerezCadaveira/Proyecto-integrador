const { check }= require('express-validator');
const path= require('path')


const validationReg  = [
    check('user_name').notEmpty().withMessage('Debes escribir un nombre y apellido completo').bail()
    .isLength({min:2}).withMessage('Este campo no admite menos de 2 caracteres'),
    check('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email').bail(),
    check('user_password').notEmpty().withMessage('Debes escribir una contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres').bail(),
    check('user_img').custom(function(value,{req}){
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



module.exports =validationReg;