const express = require ('express');

const app = express ()


const homeRouter = require ("./routers/home");

const detailRouter = require ("./routers/details");

const loginRouter = require ("./routers/login");

const carritoRouter = require ("./routers/carrito");

app.use(express.static('public'));

app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.use("/",homeRouter);

app.use("/Carrito", carritoRouter);

app.use("/login", loginRouter);

app.use ("/productDetail", detailRouter);