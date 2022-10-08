const db = require('../database/models')

function userConnectedLogged(req,res,next) { 
    if(req.session.userLogged){
        res.locals.isLogged = false
    } 
    else{
        res.locals.isLogged = true
     }
     next();
}

module.exports=userConnectedLogged;

//middleware que verifica si esta conectado el usuario, no muertre las opciones de iniciar sesion ni register