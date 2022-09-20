const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { validationResult } = require('express-validator')

const userData= path.join(__dirname, '../database/users.json')

const userBase= JSON.parse(fs.readFileSync(userData, 'utf-8'))

const productoData= path.join(__dirname, '../database/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={ 
    register: (req, res)=>{
        res.render('register', {
            titulo: "Register",
            registerError:"",
            enlace:'/css/register.css'
        });
    },
    
    login: (req, res)=>{
        res.render('login',{
            titulo:'Login',
            loginError: '',
            enlace:'/css/register.css'
        });
    },

    nuevoUser: function (req, res) {
        const error = "Tenés que subir una imagen de perfil";
        const check = "check";
        const errors = validationResult(req);
        let file = req.file;

        const userFind = userBase.filter((valor) => {
            return valor.user_email == req.body.user_email;
        });

        if (userFind.length == 0) {
            if (errors.isEmpty()) {
                if (file != undefined) {
                    let userNew = req.body;
                    const passwordCrypt = bcrypt.hashSync(req.body.user_password, 10);
                    userNew.user_password = passwordCrypt;
                    userNew.user_img = req.file.filename;
                    userNew.id = userBase[userBase.length - 1].id + 1;
                    userBase.push(userNew);

                    fs.writeFileSync(userData, JSON.stringify(userBase, null, ' '));

                    res.redirect("/");
                } else {
                    res.render("register", {
                        titulo: 'Register',
                        enlace:'/css/register.css',
                        registerError:"",
                        error,
                        old: req.body,
                        check,
                    });
                }
            } else {
                res.render("register", {
                    titulo: 'Register',
                    enlace:'/css/register.css',
                    registerError:"",
                    errors: errors.mapped(),
                    error,
                    old: req.body,
                    check,
                    file: req.file,
                });
            }
        } else {
            const userExist = "Ya existe un usuario registrado con este email";
            res.render("register", {
                titulo: 'Register',
                enlace:'/css/register.css',
                registerError:"",
                userExist,
                old: req.body,
                errors: errors.mapped(),
                check,
            });
        }
    },
    validateUser: (req,res) => {

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
        }
    
};

module.exports = controller;