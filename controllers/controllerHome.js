const path=require("path");

const controller={
    home: (req, res)=>{
        res.render('index', {
            titulo:'Login',
            enlace:'css/styles.css'
        });
    }

};

module.exports=controller;