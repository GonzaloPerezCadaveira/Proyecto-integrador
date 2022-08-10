const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs")
const { v4: uuidv4 } = require('uuid');

const userData= path.join(__dirname, '../database/users.json')

const userBase= JSON.parse(fs.readFileSync(userData, 'utf-8'))

const controller={ 
    register: (req, res)=>{
        res.render('register', {
            titulo:'Register',
            enlace:'css/registro.css'
        });
    },
    login: (req, res)=>{
        res.render('login',{
            titulo:'Login',
            enlace:'css/styles.css'
        });
    },
    nuevoUser:(req,res)=>{
        const nuevoUser = req.body;
        const nuevoUserId = uuidv4();
        const passEncriptada = bcrypt.hashSync(req.body.password,10);
        nuevoUser.password = passEncriptada;
        nuevoUser.id = nuevoUserId;
        console.log(nuevoUser);
        userBase.push(nuevoUser);
        fs.writeFileSync(userData, JSON.stringify(userBase, null, ' '));
        res.redirect('/')
    }
   
};

module.exports = controller;