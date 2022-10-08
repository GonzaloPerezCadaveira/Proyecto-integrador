function userConnected(req,res,next) {
    if(req.session.userLogged){
        res.redirect('/profile')
    }
    next();
}

module.exports = userConnected;