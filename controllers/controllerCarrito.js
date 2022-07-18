const path=require("path");

const controller={
    Carrito: (req, res)=>{
            res.render('Carrito',{
                titulo:'Carrito',
                enlace:'css/styles.css'
            });
        }

};

module.exports=controller;