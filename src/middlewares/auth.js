const verifyAuth = (req, res, next) => {
    if (req.path === '/carrito'){
        if(req.cookies.auth === 'true') {
            res.render('carritoDeCompras',{
                titulo:'Carrito',
                enlace:'css/productChart.css'
            })
        } else {
            res.render('login', {
                titulo:'Login',
                loginError: '',
                enlace:'css/register.css'
            })
        }
    }
    next()
}

module.exports = {
    verifyAuth
}