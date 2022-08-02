const path=require("path");

const controller={
    login: (req, res)=>{
        res.render('login',{
            titulo:'Login',
            enlace:'css/styles.css'
        });
    },
    usuario: (req, res)=>{
        res.render('register', {
            titulo:'Register',
            enlace:'css/registro.css'
        });
    }

};

module.exports=controller;