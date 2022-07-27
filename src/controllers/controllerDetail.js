const path =require('path');
const fs= require('fs');

const productoData= path.join(__dirname, '../data/productsData.json')
const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))
console.log(productoBase)
const controller={
    
    detail: (req, res)=>{
        prooducto={
            nombre:'Cerveza corona Extra 355ml',
            precio:'500$',
            opcion: ['Nada','Mas nada'],
            variable:1
        }
        res.render('productDetail',{
            producto:prooducto,
            titulo:'Detalle de Producto',
            enlace:'/css/productDetail.css',
       });
    }
};

module.exports=controller;