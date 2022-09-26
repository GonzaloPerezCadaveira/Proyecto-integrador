const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const db = require('../database/models')


const controller = {
    create: (req, res) => {
        db.Category.findAll()
            .then(function (categories) {
                res.render('create-product', {
                    categories,
                    titulo: 'Creacion de Producto',
                    enlace: '/css/createProduct.css'
                })
            })
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
        db.Product.findAll()
            .then(function (productos) {
                res.render('productsList', {
                    titulo: 'Carta de bebidas',
                    enlace: '/css/productsList.css',
                    toThousand,
                    productos
                })
            })

    },
    detail: (req, res) => {
        let idParams = req.params.id
        db.Product.findOne({
            where: { id: idParams }
        })
            .then(function (productos) {
                res.render('productDetail', {
                    titulo: 'Detalle de Producto',
                    enlace: '/css/productDetail.css',
                    productos,
                    toThousand
                })
            })
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

                }, {
                where: { id: req.params.id }
            })
                .then(function () {
                    res.redirect('/products/' + req.params.id)
                })
    },
    destroy: (req, res) => {
        db.Product.destroy({
            where: { id: req.params.id }
        })
            .then(function () {
                res.redirect('/')
            })
    },
    carrito: (req, res) => {
        res.render('carritoDeCompras', {
            titulo: 'Carrito',
            enlace: '/css/productChart.css'
        });
    }
}

module.exports = controller;