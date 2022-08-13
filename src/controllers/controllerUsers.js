const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');
const session = require("express-session")

const userData= path.join(__dirname, '../database/users.json')

const userBase= JSON.parse(fs.readFileSync(userData, 'utf-8'))

const productoData= path.join(__dirname, '../database/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={ 
    register: (req, res)=>{
        res.render('register', {
            titulo:'Register',
            registerError:"",
            enlace:'css/registro.css'
        });
    },
    login: (req, res)=>{
        res.render('login',{
            titulo:'Login',
            loginError: '',
            enlace:'css/styles.css'
        });
    },
    nuevoUser:(req,res)=>{
        const nuevoUser = req.body;
        const emailExist = userBase.find (user => user.email === nuevoUser.email);
        if (!emailExist) {
            const nuevoUserId = uuidv4();
            const passEncriptada = bcrypt.hashSync(req.body.password,10);
            nuevoUser.password = passEncriptada;
            nuevoUser.id = nuevoUserId;
            console.log(nuevoUser);
            userBase.push(nuevoUser);
            fs.writeFileSync(userData, JSON.stringify(userBase, null, ' '));
            res.redirect('/')
        }
        else {
            res.render ('register', {
                titulo:'Register',
                registerError:"Email ya registrado",
                enlace:'css/registro.css'
            })
        }
    },
    validateUser: (req,res) => {
        const validateUser = req.body;
        const user = userBase.find (user => user.email === validateUser.email);
        console.log('USER: ', user)
        if (user) {
            if (bcrypt.compareSync(validateUser.password, user.password)){
                res.cookie('auth', true)
                res.render('index',{
                    productoBase,
                    titulo:'Carpincho Drinks',
                    enlace:'css/style_index.css'
                })
            }
        }
        res.cookie('auth', false)
        res.render('login', {
            titulo:'Login',
            loginError: 'Credenciales inválidas',
            enlace:'css/styles.css'
        })
    }
   
};

module.exports = controller;