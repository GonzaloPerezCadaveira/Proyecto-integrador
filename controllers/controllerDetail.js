const path =require('path');

const controller={
    
    detail: (req, res)=>{
        prooducto={
            nombre:'Cerveza corona Extra 355ml',
            precio:'500$',
            opcion:['corona 355', 'corona 750','opciones']
        }
        res.render('productDetail',{
            producto:prooducto,
            titulo:'Detalle de Producto',
            enlace:'/css/productDetail.css',
       });
    }
};

module.exports=controller;