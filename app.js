const express = require ('express');
const app = express();
const methodOverride= require('method-override');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const { verifyAuth } = require('./src/middlewares/auth');

// Routers
const homeRouter = require("./routers/home");
const productsRouter = require("./routers/products");
const usersRouter = require('./routers/users')

// Template engine
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

//Middlewares
app.use(verifyAuth)

app.listen (3050, () => { 
console.log ('Servidor corriendo en puerto 3050')
})

app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/", usersRouter)


module.exports = app