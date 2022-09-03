const path = require('path');
const fs = require('fs');
const { nextTick } = require('process');

const productoData = path.join(__dirname, '../database/productsData.json')
const catData = path.join(__dirname, '../database/categories.json')

const productoBase = JSON.parse(fs.readFileSync(productoData, 'utf-8'))
const catBase = JSON.parse(fs.readFileSync(catData, 'utf-8'))

const controller = {
    productsList: (req, res) => {
        res.render('productsList', {
        titulo: 'Carta de bebidas',
        productos:productoBase,
        enlace: '/css/productsList'})
    },
    detail: (req, res) => {
        const idprod = req.params.id;
        res.render('productDetail', {
            producto: productoBase[idprod],
            productoBase,
            titulo: 'Detalle de Producto',
            enlace: '/css/productDetail.css',
        });
    },
    create: (req, res) => {
        res.render('create-product', {
            catBase,
            titulo: 'Creacion de Producto',
            enlace: '/css/crear_prod.css'
        });
    },
    carrito: (req, res) => {
        res.render('carritoDeCompras', {
            titulo: 'Carrito',
            enlace: 'css/styles.css'
        });
    },
    store: (req, res) => {
        const nuevoProducto = req.body;
        nuevoProducto.id = productoBase.length;
        console.log(nuevoProducto);
        if (req.file) {
            nuevoProducto.img = req.file.filename
        }
        productoBase.push(nuevoProducto);
        fs.writeFileSync(productoData, JSON.stringify(productoBase, null, ' '));
        res.redirect('/')
    },
    edit: (req, res) => {
        const idProduc = req.params.id;
        const productEdit = productoBase.find(item => item.id == idProduc)
        res.render('edit-product', {
            producto: productEdit,
            titulo: 'Edicion de Producto',
            enlace: '/css/crear_prod.css'
        })
    },
    editComplete: (req, res) => {
        const idProduc = req.params.id
        const product = productoBase.find(item => item.id == idProduc);
        product.name = req.body.name
        product.cantidad = req.body.cantidad
        product.precio = req.body.precio
        product.descripcion = req.body.descripcion
        const data = JSON.stringify(productoBase, null, ' ')
        fs.writeFileSync(productoData, data);
        res.redirect('/')
    },
    destroy: (req, res) => {
        var i = 0;
        const idProd = req.params.id;
        const productFilter = productoBase.filter(item => item.id != idProd);
        productFilter.forEach(element => {
            element.id = i++
        });
        const data = JSON.stringify(productFilter, null, " ");
        fs.writeFileSync(productoData, data);
        res.redirect('/')
    }
};

module.exports = controller;