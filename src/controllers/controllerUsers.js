const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const { validationResult } = require('express-validator')

// const userData = path.join(__dirname, '../database/users.json')

// const userBase = JSON.parse(fs.readFileSync(userData, 'utf-8'))

// const productoData = path.join(__dirname, '../database/productsData.json')

// const productoBase = JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const db = require('../database/models');

const sequelize = db.sequelize;

const { Op } = require('sequelize');


const controller = {
    register: (req, res) => {

        res.render('register', {
            titulo: "Register",
            registerError: "",
            enlace: '/css/register.css'
        });
    },

    store: function (req, res) {
        const errors = validationResult(req);
        console.log(req.body);
        if (!errors.isEmpty()) {
            res.render('register', {
                titulo: "Register",
                enlace: "/css/register.css",
                errors: errors.mapped(),
                old: req.body
            });
        }
        else {
            db.User.findOne({
                where: {
                    user_email: req.body.user_email
                }
            })
                .then(function (usuario) {
                    if (!usuario) {
                        console.log('llegue aca por then ');
                        db.User.create({
                            user_name: req.body.user_name,
                            user_email: req.body.user_email,
                            user_password: bcrypt.hashSync(req.body.user_password, 10),
                            user_img: req.file.filename,
                            user_cat: 1
                        })
                            .then(function () {
                                res.redirect('/')
                            })
                            .catch(function (e) {
                                console.log('llegue aca');
                                res.render('error', { titulo: '404', enlace: 'css/error.css' })
                            })
                    }
                    else {
                        console.log('hola llegue por el else');
                        res.render('register', {
                            titulo: "Register",
                            enlace: "/css/register.css",
                            errors: errors.mapped(),
                            errors: {
                                user_email: { msg: 'El email ' + usuario.user_email + ' ya se encuentra registrado' }
                            },
                            old: req.body
                        });
                    }
                })

        }
    },
    login: (req, res) => {
        console.log(req.cookies);
        if (req.cookies.userLogueado) {
            res.render('login', {
                titulo: 'login',
                loginError: '',
                enlace: '/css/login.css',
                user_email: req.cookies.userLogueado
            });
        }
        else {
            res.render('login', {
                titulo: 'login',
                loginError: '',
                enlace: '/css/login.css',
            });
        }

    },
    loginSucces: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('login', {
                titulo: "login",
                enlace: "/css/login.css",
                errors: errors.mapped(),
                old: req.body
            });
        }
        else {
            db.User.findOne({
                where: {
                    user_email: req.body.user_email
                }
            })
                .then(function (usuario) {
                    if (usuario) {
                        let check = bcrypt.compareSync(req.body.user_password, usuario.user_password)
                        if (check) {
                            if (req.body.rememberUser) {
                                res.cookie('userLogueado', usuario.user_email, { maxAge: 1000 * 60 })
                            }
                            req.session.userLogged = usuario
                            res.redirect("/user/profile")
                        }
                        else {
                            res.render('login', {
                                titulo: "login",
                                enlace: "/css/login.css",
                                errors: {
                                    user_password: { msg: 'La contraseña ingresada es incorrecta' }
                                },
                                old: req.body
                            });
                        }
                    }
                    else {
                        res.render('login', {
                            titulo: "login",
                            enlace: "/css/login.css",
                            errors: {
                                user_email: { msg: 'El email ingresado no se encuentra registrado' }
                            },
                            old: req.body
                        });
                    }
                })
                .catch(function (e) {
                    console.log('llegue aca');
                    res.render('error', {
                        titulo: '404',
                        enlace: 'css/error.css'
                    })
                })
        }
    },
    profile: (req, res) => {
        if (req.session.userLogged) {
            const usuario = req.session.userLogged
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('profile', {
                        titulo: 'Profile',
                        enlace: '/css/profile.css',
                        user
                    })
                })
        }
        else {
            res.render('profile', {
                titulo: 'Profile',
                enlace: '/css/profile.css',
            })
        }
    },
    edit: (req, res) => {
        const usuario = req.session.userLogged
        console.log(usuario);
        if (usuario) {
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('edit-user', {
                        titulo: 'Edicion de usuario',
                        enlace: '/css/editUser.css',
                        user
                    })
                })
        }
    },
    editSucces: (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (user) {
                    res.render('edit-user', {
                        titulo: 'Edicion de usuario',
                        enlace: '/css/editUser.css',
                        errors: errors.mapped(),
                        old: req.body,
                        user
                    });
                })
        }
        else {
            db.User.update(
                {
                    user_name: req.body.user_name,
                    user_email: req.body.user_email,
                    user_img: req.file.filename
                },
                {
                    where: { id: req.params.id }
                })
                .then(function () {
                    res.redirect('/user/profile')
                })
        }
    },
    logout: (req, res) => {
        res.clearCookie('userLogueado')
        req.session.destroy();
        return res.redirect('/')
    },
    usersList: (req, res) => {
        const usuario = req.session.userLogged
        if (usuario) {
            db.User.findOne({
                where: { id: usuario.id }
            })
                .then(function (userOn) {
                    const user = userOn
                    db.User.findAll()
                        .then(function (usuarios) {
                            res.render('usersList', {
                                titulo: 'Lista de usuarios registrados',
                                enlace: '/css/usersList.css',
                                usuarios,
                                user:userOn
                            })
                        })
                })
        } else {
            res.render('profile', {
                titulo: 'Profile',
                enlace: '/css/profile.css',
            })
        }
    },
    destroy: (req, res) => {
        db.User.destroy({
            where: { id:req.params.id }
        })
        .then(function(){
            res.redirect('/')
        })
    },

}

module.exports = controller;

// Controladores con archivo JSON.

// nuevoUser: function (req, res) {
    //     const error = "Debes subir una imagen de perfil";
    //     const check = "check";
    // async (req, res) => {
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         res.render('login', { errors: errors.mapped(), old: req.body });
    //     };
    //     let foundUser = await db.User.findOne({ where: { user_email: { [Op.like]:'<%'+req.body.user_email+'%>' } } });
    //     let foundPassword = bcrypt.compareSync(req.body.password, foundPassword.password);
    //     if (!foundUser) {
    //         res.render('login', {
    //             errors: {
    //                 user_email: {
    //                     msg: 'No se encuentra el email'
    //                 }
    //             }
    //         })
    //     };
    //     if (foundUser && !foundPassword) {
    //         res.render('login', {
    //             errors: {
    //                 password: {
    //                     msg: 'La contraseña es incorrecta'
    //                 }
    //             }
    //         })
    //     };
    //     if (foundUser && foundPassword) {
    //         delete foundUser.password;
    //         req.session.userLog = foundUser;
    //         if (req.body.rememberUser) {
    //             res.cookie('userEmail', req.body.email, { maxAge: 86400000 });
    //         };
    //         res.redirect('/');
    //     };
    // },
//     const errors = validationResult(req);
//     let file = req.file;

//     const userFind = userBase.filter((valor) => {
//         return valor.user_email == req.body.user_email;
//     });

//     if (userFind.length == 0) {
//         if (errors.isEmpty()) {
//             if (file != undefined) {
//                 let userNew = req.body;
//                 const passwordCrypt = bcrypt.hashSync(req.body.user_password, 10);
//                 userNew.user_password = passwordCrypt;
//                 userNew.user_img = req.file.filename;
//                 userNew.id = userBase[userBase.length - 1].id + 1;
//                 userBase.push(userNew);

//                 fs.writeFileSync(userData, JSON.stringify(userBase, null, ' '));

//                 res.redirect("/");
//             } else {
//                 res.render("register", {
//                     titulo: 'Register',
//                     enlace:'/css/register.css',
//                     registerError:"",
//                     error,
//                     old: req.body,
//                     check,
//                 });
//             }
//         } else {
//             res.render("register", {
//                 titulo: 'Register',
//                 enlace:'/css/register.css',
//                 registerError:"",
//                 errors: errors.mapped(),
//                 error,
//                 old: req.body,
//                 check,
//                 file: req.file,
//             });
//         }
//     } else {
//         const userExist = "Ya existe un usuario registrado con este email";
//         res.render("register", {
//             titulo: 'Register',
//             enlace:'/css/register.css',
//             registerError:"",
//             userExist,
//             old: req.body,
//             errors: errors.mapped(),
//             check,
//         });
//     }
// },
// validateUser: (req,res) => {

//     res.render('index',{
//         productoBase,
//         titulo:'Carpincho Drinks',
//         enlace:'css/style_index.css'
//     })
// },{

// }
// res.cookie('auth', false)
// res.render('login', {
//     titulo:'Login',
//     loginError: 'Credenciales inválidas',
//     enlace:'css/styles.css'
// })






// const errors = validationResult(req);
        // let emailEnUso = await db.User.findOne({ where: { user_email: req.body.user_email } });
        // let nameEnUso = await db.User.findOne({ where: { user_name: req.body.user_name } })
        // if (!errors.isEmpty()) {
        //     res.render('register', {
        //         titulo: "Register",
        //         enlace: "/css/register.css",
        //         errors: errors.mapped(),
        //         old: req.body
        //     });
        // } else if (emailEnUso && nameEnUso) {
        //     res.render('register', {
        //         titulo: "Register",
        //         enlace: "/css/register.css",
        //         errors:
        //         {
        //             user_email: { msg: 'La dirección de correo electronico no se encuentra disponible' },
        //             user_name: { msg: 'El nombre seleccionado no se encuentra disponible' }
        //         }
        //     });
        // } else {
        //     await db.User.create({
        //         user_name: req.body.user_name,
        //         user_email: req.body.user_email,
        //         password: bcrypt.hashSync(req.body.user_password, 10),
        //         user_img: req.file.filename,
        //         id_type: 2
        //     })
        //         .then((user) => {
        //             res.redirect('login'), {
        //                 titulo: "Login",
        //                 enlace: "/css/login.css",
        //                 errors,
        //                 old: req.body
        //             };
        //         })
        // }
