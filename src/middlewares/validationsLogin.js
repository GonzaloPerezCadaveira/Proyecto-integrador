const { body }=require('express-validator');

const validacionLogin = [
    body('user_email').notEmpty().withMessage('Debes completar con tu email').bail()
    .isEmail().withMessage('Debes ingresar un formato válido de email').bail(),
    body('user_password').notEmpty().withMessage('Debes escribir una contraseña').bail()
    
]

module.exports = validacionLogin;