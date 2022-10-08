const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models')



const controller = {
    create: (req, res) => {
        const usuario=req.session.userLogged
        if(usuario){
            db.User.findOne({
                where:{id:usuario.id}
            })
            .then(function(user){
                res.render('create-product', {
                    categories,
                    titulo: 'Creacion de Producto',
                    enlace: '/css/createProduct.css',
                    user
                })
            })
        }else{
            res.render('create-product', {
                categories,
                titulo: 'Creacion de Producto',
                enlace: '/css/createProduct.css',
            })
        }
            
    },
    store: (req, res) => {
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            discount: req.body.discount,
            cat_id: req.body.cat_id,
            img: req.file.filename
        }).then(function () {
            res.redirect('/products');
        })
    },
    productsList: (req, res) => {
        const usuario=req.session.userLogged
        if(usuario){
            db.User.findOne({
                where:{id:usuario.id}
            })
            .then(function(userOn){
                const user = userOn
                db.Product.findAll()
                .then(function(productos){ 
                    res.render('productsList', {
                        titulo: 'Carta de bebidas',
                        enlace: '/css/productsList.css',
                        toThousand,
                        productos,
                        user
                    })
                })
            })
        }else{
            db.Product.findAll()
            .then(function(productos){ 
                res.render('productsList', {
                    titulo: 'Carta de bebidas',
                    enlace: '/css/productsList.css',
                    toThousand,
                    productos
                })
            })
        }


    },
    detail: (req, res) => {
        
        let idParams = req.params.id

        const usuario=req.session.userLogged
        if(usuario){
            db.Product.findOne({
                where: { id: idParams }
            })
            .then(function (producto) {
                res.render('productDetail', 
                {
                    titulo: 'Detalle de Producto',
                    enlace: '/css/productDetail.css',
                    producto,
                    toThousand,
                    user
                })
            })
        }else{
            db.Product.findOne({
                where: { id: idParams }
            })
            .then(function (producto) {
                res.render('productDetail', 
                {
                    titulo: 'Detalle de Producto',
                    enlace: '/css/productDetail.css',
                    producto,
                    toThousand
                })
            })
        }

    },
    edit: (req, res) => {
        let idParams = req.params.id
        let pedidoProduct = db.Product.findOne({
            where: { id: idParams }
        })
        let pedidoCat = db.Category.findAll()
        Promise.all([pedidoProduct, pedidoCat])
            .then(function ([product, categories]) {
                res.render('edit-product', {
                    titulo: 'Edicion de Producto',
                    enlace: '/css/editProduct.css',
                    product,
                    categories,
                })
            })
    },
    editComplete: (req, res) => {
            db.Product.update(
                {
                    description: req.body.description,
                    price: req.body.price,
                    quantity: req.body.quantity,
                    discount: req.body.discount,
                    cat_id: req.body.category,
                    name: req.body.name,
                    img: req.file.filename

                }, {
                where: { id: req.params.id }
            })
                .then(function () {
                    res.redirect('/')
                })
    },
    destroy: (req, res) => {
        db.Product.destroy({
            where: { id:req.params.id }
        })
        .then(function(){
            res.redirect('/')
        })
    },
    carrito: (req, res) => {
        db.Product.findAll()
        .then(response => {
         res.render('products/carritoDeCompras', {carritoDeCompras:response, toThousand});
        }).catch(function(e) {
            res.render('error', { titulo: '404', enlace: 'css/error.css'})
        })
    }
}

module.exports = controller;