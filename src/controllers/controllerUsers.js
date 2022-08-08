const path = require("path");

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
   
};

module.exports = controller;