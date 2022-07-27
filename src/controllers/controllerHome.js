const path=require("path");

const controller={
    home: (req, res)=>{
        res.render('index', {
            titulo:'Login',
            enlace:'css/style_index.css'
        });
    }

};

module.exports=controller;