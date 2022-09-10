const {body, validationResult} = require('express-validator');

// Validaciones para el formulario de registro
exports.reg = [
    body('user_name')
        .notEmpty().withMessage('Por favor, complete con su nombre y apellido').bail()
        .isLength({ min: 3 }).withMessage('Este campo debe tener al menos 3 caracteres').bail()
        .isLength({ max: 20 }).withMessage('Este campo debe tener un máximo de 20 caracteres'),
    body('user_email')
        .notEmpty().withMessage('Por favor complete con su email').bail()
        .isEmail().withMessage('Por favor ingrese un email válido'),
    body('password')
        .notEmpty().withMessage('Por favor ingrese su contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    // body('user_img')
    //     .custom((value, {req}) => {
    //         if(!req.file) {
    //             throw new Error('Por favor suba una imagen');
    //         } else {
    //             return true
    //         }
    //     })
];

// Validaciones para el formulario de login
exports.log = [
    body('email')
        .notEmpty().withMessage('Por favor ingrese su email').bail()
        .isEmail().withMessage('Por favor ingrese un email válido'),
    body('password')
        .notEmpty().withMessage('Por favor ingrese su contraseña').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
];
