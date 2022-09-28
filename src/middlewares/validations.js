const { check }= require('express-validator');
const db = require('../database/models');

const validation = [
    check('user_name').notEmpty().withMessage('Debes escribir un nombre y apellido completo').bail()
    .isLength({min:3}).withMessage('Este campo no admite menos de 3 caracteres'),
    check('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email').custom(function(emailIngresado){
        db.User.findOne({
            where:{
                user_email:emailIngresado
            }
        })
        .then(function(usuario){
            if(usuario){
                return Promise.reject('Ya existe un usuario con este Email')
            }
        })
    }),
    check('user_password').notEmpty().withMessage('Debes escribir una contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres'),
    check('user_img').notEmpty().withMessage('Debes subir una imagen de perfil').bail()
]

module.exports = validation;