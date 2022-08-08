const express = require ('express');
const app = express()
const methodOverride= require('method-override')
const logger = require('morgan');
const cookieParser = require('cookie-parser');

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
app.use(logger('dev'));
app.use(cookieParser())
app.use(methodOverride('_method'));

app.listen (3050, () => { 
console.log ('servidor corriendo')
})

app.use("/",homeRouter);

app.use("/products",productsRouter);

app.use("/login",usersRouter );

app.use("/registro", usersRouter);

module.exports= app