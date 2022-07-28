const path =require('path');
const fs= require('fs');

const productoData= path.join(__dirname, '../data/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))


console.log(productoBase)


const controller={
    detail: (req, res)=>{
        const idprod = req.params.id;
        const product = productoBase.find(item => item.id == idprod);
        res.render('productDetail',{
            product:product,
            productoBase,
            titulo:'Detalle de Producto',
            enlace:'/css/productDetail.css',
       });
    },
    create:(req,res)=>{
        res.render('create-product',{
            titulo:'Creacion de Producto',
            enlace:'/css/crear_prod.css'
        });
    },
    store:(req,res)=>{
        const nuevoProducto = req.body;
        nuevoProducto.id = productoBase.length +1;
        productoBase.push(nuevoProducto);
        fs.writeFileSync(productoData, JSON.stringify(productoBase, null, ' '));
        res.redirect('/')
    }
};

module.exports=controller;