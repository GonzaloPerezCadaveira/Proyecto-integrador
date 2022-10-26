const db = require('../database/models')

function userConnectedLogged(req,res,next) { 
    let emailInCookie = req.cookies.userLogueado
    console.log('hola' + emailInCookie);
    console.log(req.session.userLogged); 
    if(emailInCookie && emailInCookie!==undefined){
        console.log(emailInCookie);
        db.User.findOne({
            where:{user_email:emailInCookie}
        })
        .then(function(usuario){
            if(usuario.user_cat=2){
                if(req.session.userLogged){
                    req.session.userLogged=usuario
                }
                console.log(req.session.userLogged);     
            }
        })
    }
    if(req.session.userLogged){
        res.locals.isLogged = false
    } 
    else{
        res.locals.isLogged = true
     }
     next();
}


module.exports=userConnectedLogged;
