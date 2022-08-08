const path =require('path');
const fs= require('fs');

const productoData= path.join(__dirname, '../data/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

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
    carrito: (req, res)=>{
        res.render('Carrito',{
            titulo:'Carrito',
            enlace:'css/styles.css'
        });
    },
    store:(req,res)=>{
        const nuevoProducto = req.body;
        nuevoProducto.id = productoBase.length +1;
        productoBase.push(nuevoProducto);
        fs.writeFileSync(productoData, JSON.stringify(productoBase, null, ' '));
        res.redirect('/')
    },
    edit:(req,res)=>{
        // JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		// const idProduc = req.params.id;
		// const productEdit = products.find( item => item.id == idProduc )
        // fs.writeFileSync(productoData, JSON.stringify(productoBase, null, ' '));
		res.render('edit-product',{
            titulo:'Edicion de Producto',
            enlace:'/css/crear_prod.css'
        })
    },
    editComplete:(req,res)=>{
        const idProduc= req.params.id
        const product=productoBase.productoBase.find(item => item.id == idprod);
        product.name=req.body.nombre
        product.cantidad=req.body
               
    }
};

module.exports=controller;