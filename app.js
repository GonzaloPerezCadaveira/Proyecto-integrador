const express = require ('express');
const app = express()


const homeRouter = require("./src/routers/home");

const productsRouter = require("./src/routers/products");

const usersRouter = require ('./src/routers/users')

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

app.use("/productDetail",productsRouter);

app.use("/carrito", productsRouter);

app.use("/login",usersRouter );

app.use("/registro", usersRouter);

