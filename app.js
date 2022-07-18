const express = require ('express');

const app = express ()


const homeRouter = require("./routers/home");

const detailRouter = require("./routers/details");

const loginRouter = require("./routers/login");

const carritoRouter = require("./routers/carrito");

app.set('view engine', 'ejs');

// En caso de que querramos llamar a la carpeta con otro nombre :
// app.set('views', __dirname + '/otro_nombre');


app.use(express.static('public'));


app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.use("/home",homeRouter);

app.use("/Carrito", carritoRouter);

app.use("/login", loginRouter);

app.use("/productDetail", detailRouter);