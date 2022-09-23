const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models')


const controller = {
    productsList: (req, res) => {
        db.Product.findAll()
        .then(function(products){
            res.render('productsList', {
                titulo: 'Carta de bebidas',
                products,
                enlace: '/css/productsList.css'})
        })
        
    },
    detail: (req, res) => {
        let idParams= req.params.id
        db.Product.findOne({
            where:{id:idParams}
        })
        .then(function(products) {
            res.render('productDetail',{
                titulo:'Detalle de Producto',
                enlace:'/css/productDetail.css',
                products

            })
        })
    },
    create: (req, res) => {
        db.Category.findAll()
        .then(function(categories){
                res.render('create-product', {
                categories:categories,
                titulo: 'Creacion de Producto',
                enlace: '/css/register.css'
            })
        })
    },
    carrito: (req, res) => {
        res.render('carritoDeCompras', {
            titulo: 'Carrito',
            enlace: '/css/productChart.css'
        });
    },
    store: (req, res) => {
        db.Product.create({
            description:req.body.description,
            price:req.body.price,
            quantity:req.body.quantity,
            discount:req.body.discount,
            cat_id:req.body.category,
            name: req.body.name
        }).then(function () {
            res.redirect('/');
        })  
    },
    edit: (req, res) => {
        let idParams= req.params.id
        let pedidoProduct = db.Product.findOne({
            where:{id:idParams}
        })
        let pedidoCat = db.Category.findAll()
        Promise.all([pedidoProduct,pedidoCat])
        .then(function([product, categories]){
            res.render('edit-product',{
                product,
                categories,
                titulo: 'Edicion de Producto',
                enlace: '/css/register.css'
            })
        })
    },
    editComplete: (req, res) => {
        db.Product.update(
            {
                description:req.body.description,
                price:req.body.price,
                quantity:req.body.quantity,
                discount:req.body.discount,
                cat_id:req.body.category,
                name: req.body.name
            },{
            where:{id:req.params.id}
        })
        .then(function () {
            res.redirect('/')
        })
    },
    destroy: (req, res) => {
        db.Product.destroy({
            where:{id: req.params.id}
        })
        .then(function () {
            res.redirect('/')
        })
    }
}

module.exports = controller;