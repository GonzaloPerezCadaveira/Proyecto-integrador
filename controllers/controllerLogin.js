const path=require("path");

const controller={
    login: (req, res)=>{
        res.render('login',{
            titulo:'Login',
            enlace:'css/styles.css'
        });
    }

};

module.exports=controller;