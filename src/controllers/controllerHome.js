const path=require("path");

const controller={
    home: (req, res)=>{
        res.render('index', {
            titulo:'Carpincho Drinks',
            enlace:'css/style_index.css'
        });
    }

};

module.exports=controller;