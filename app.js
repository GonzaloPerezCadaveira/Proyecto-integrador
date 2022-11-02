const express = require ('express');
const app = express();
const methodOverride= require('method-override');
const logger = require('morgan');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const userConnectedLogged=require('./src/middlewares/userConnectedLogged')

// Routers
const homeRouter = require("./routers/home");
const productsRouter = require("./routers/products");
const usersRouter = require('./routers/users')
const apiRouter = require('./routers/api/apisCarpinchoDrinks') 

// Template engine
app.set('view engine', 'ejs');

// En caso de que querramos llamar a la carpeta con otro nombre :
// app.set('views', __dirname + '/otro_nombre');
app.set('views',__dirname + '/src/views')

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(logger('dev'));
app.use(session({
    secret:'Its secrets',
    resave:false,
    saveUninitialized:false
}))
app.use(cookieParser())
app.use(methodOverride('_method'));



//Middlewares
app.use(userConnectedLogged)

app.listen (3020, () => { 
console.log ('Servidor corriendo en puerto 3020')
})

app.use("/", homeRouter);
app.use("/products", productsRouter);
app.use("/user", usersRouter);
app.use("/api", apiRouter);


// Error (404):
app.use((req, res, next) => {
    res.status(404).render('error');
})

module.exports = app