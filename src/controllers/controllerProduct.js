const path =require('path');
const fs= require('fs');

const productoData= path.join(__dirname, '../database/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={  
    detail: (req, res)=>{
        const idprod = req.params.id;
        res.render('productDetail',{
            producto:productoBase[idprod],
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
        res.render('CarritoDeCompras',{
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
		const idProduc = req.params.id;
		const productEdit = productoBase.find(item => item.id == idProduc)
		res.render('edit-product',{
            producto:productEdit,
            titulo:'Edicion de Producto',
            enlace:'/css/crear_prod.css'
        })
    },
    editComplete:(req,res)=>{
        const idProduc= req.params.id
        const product=productoBase.find(item => item.id == idProduc);
        // product.name=req.body.name
        // product.cantidad=req.body.cantidad
        // product.precio=req.body.precio
        // product.descripcion=req.body.descripcion
        productoBase.push(product)
        const data= JSON.stringify(productoBase,null,' ')
        fs.writeFileSync(productoData,data);
        res.redirect('/') 
    },
    destroy:(req,res)=>{
        const idProd= req.params.id;
        const productFilter= productoBase.filter(item => item.id != idProd);
        const data= JSON.stringify(productFilter,null ," ");
        fs.writeFileSync(productoData,data);
        res.redirect('/')
    }
};

module.exports=controller;