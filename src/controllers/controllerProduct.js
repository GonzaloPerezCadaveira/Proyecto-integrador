const path = require('path');
const fs = require('fs');
const db = require('../database/models')
const sequelize = db.sequelize;

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const { validationResult } = require('express-validator');


const controller = {
    create: (req, res) => {
        db.Category.findAll()
        .then(function(categories) {
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
                res.redirect('/user/register')
            }
        })
            
    },
    store: (req, res) => {
        const errors = validationResult(req);
        const usuario=req.session.userLogged
        console.log(usuario);
        if (usuario){
            if (!errors.isEmpty()) {
                console.log(errors)
                let categorias = db.Category.findAll()
                let userOn=db.User.findOne({
                    where:{ id:usuario.id}
                })
                Promise.all([categorias, userOn])
                .then(function([categories,user]) {
                    res.render('create-product', {
                        titulo: 'Creacion de Producto',
                        enlace: '/css/createProduct.css',
                        errors: errors.mapped(),
                        old: req.body,
                        producto:{
                            id:req.params.id
                        },
                        user,
                        categories
                    });
                })

            }
            else{
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
            }
        }
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
            db.User.findOne({
                where:{id:usuario.id}
            })
            .then(function (user) {
                db.Product.findOne({
                    where: { id: idParams }
                })
                .then(function (response) {
                    res.render('productDetail', 
                        {
                        titulo: 'Detalle de Producto',
                        enlace: '/css/productDetail.css',
                        producto:response,
                        toThousand,
                        user
                    })
                })
                .catch(function(e) {
                    res.render('error', { titulo: '404', enlace: 'css/error.css'})
                })
            })
        }else{
            db.Product.findOne({
                where: { id: idParams }
            })
            .then(function(producto){
                res.render('productDetail', 
                {
                    titulo: 'Detalle de Producto',
                    enlace: '/css/productDetail.css',
                    producto:producto,
                    toThousand
                })
            })
            .catch(function(e) {
                res.render('error', { titulo: '404', enlace: 'css/error.css'})
            })
        }

    },
    edit: (req, res) => {
        let idParams = req.params.id
        const usuario=req.session.userLogged
        if(usuario){
            db.User.findOne({
                where:{id:usuario.id}
            })
            .then(function(user){
                let pedidoProduct = db.Product.findOne({
                    where: { id: idParams }
                })    
                let pedidoCat = db.Category.findAll()
                Promise.all([pedidoProduct, pedidoCat])
                    .then(function ([product, categories]){
                        product.description.trim();
                        res.render('edit-product', {
                            titulo: 'Edicion de Producto',
                            enlace: '/css/editProduct.css',
                            product,
                            categories,
                            user
                        })
                    })
            })
        } 
        else {
            res.redirect('/login')
        }   
    },
    editComplete: (req, res) => {
        const errors = validationResult(req);
        const usuario=req.session.userLogged
        console.log(usuario);
        if (usuario){
            if (!errors.isEmpty()) {
                console.log(errors)
                db.User.findOne({
                    where:{ id:usuario.id}
                })
                .then(function(user) {
                    res.render('edit-product', {
                        titulo: 'Edicion de Producto',
                        enlace: '/css/editProduct.css',
                        errors: errors.mapped(),
                        old: req.body,
                        producto:{
                            id:req.params.id
                        },
                        user
                    });
                })
            }
            else{
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
            }
        }
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
        const usuario=req.session.userLogged
        console.log(usuario);
        if (usuario){
            let productos= db.Product.findAll()
            let userOn = db.User.findOne({
                where:{id:usuario.id}
            })
            Promise.all([productos,userOn])
            .then(([products,user]) => {
             res.render('carritoDeCompras', {
                carritoDeCompras:products,
                toThousand,
                user,
                titulo:'Carrito de Compras',
                enlace:'/css/productChart.css'    
                });
            }).catch(function(e) {
                res.render('error', { titulo: '404', enlace: 'css/error.css'})
            })
        }
        else{
            res.redirect('/login')
        }
    }
}

module.exports = controller;