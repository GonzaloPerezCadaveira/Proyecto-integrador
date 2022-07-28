const express = require ('express');
const app = express()


const homeRouter = require("./src/routers/home");

const detailRouter = require("./src/routers/details");

const loginRouter = require("./src/routers/login");

const carritoRouter = require("./src/routers/carrito");

const registerRouter = require("./src/routers/registro")

app.set('view engine', 'ejs');

// En caso de que querramos llamar a la carpeta con otro nombre :
// app.set('views', __dirname + '/otro_nombre');
app.set('views',__dirname + '/src/views')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.use("/",homeRouter);

app.use("/carrito", carritoRouter);

app.use("/login", loginRouter);

app.use("/registro", registerRouter);

app.use("/productDetail", detailRouter);