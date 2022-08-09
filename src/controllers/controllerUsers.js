const path = require("path");
const fs= require('fs');

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
        nuevoUser.id = userBase.length;
        userBase.push(nuevoUser);
        fs.writeFileSync(userData, JSON.stringify(userBase, null, ' '));
        res.redirect('/')
    }
   
};

module.exports = controller;