const { body }= require('express-validator');

const validation = [
    body('user_name').notEmpty().withMessage('Debes completar con tu nombre y apellido completo').bail()
    .isLength({min:3}).withMessage('Este campo no admite menos de 3 caracteres'),
    body('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email'),
    body('user_password').notEmpty().withMessage('Debes ingresar una contraseña').bail()
    .isLength({min:8}).withMessage('La contraseña debe tener un mínimo de 8 caracteres')
]

module.exports = validation;