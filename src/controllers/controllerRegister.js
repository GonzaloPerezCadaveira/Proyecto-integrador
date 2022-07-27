const path=require("path");

const controller={
    usuario: (req, res)=>{
        res.render('register', {
            titulo:'Register',
            enlace:'css/registro.css'
        });
    }

};

module.exports=controller;