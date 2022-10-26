const db = require('../database/models')

function adminCreate(req,res,next){
    console.log(req.session.userLogged)
    if(req.session.userLogged){
        db.User.findOne({
            where:{user_email:req.session.userLogged.user_email}
        })
        .then(function(usuario){
            console.log(usuario.user_cat);
            if(usuario.user_cat===2){
                next()     
            }
            else{
               return res.redirect('/')
            }
        })
    }
    else
    {
       return res.redirect('/')
    }
}

module.exports= adminCreate