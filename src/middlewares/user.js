const path = require("path");
const fs = require("fs")

const userData= path.join(__dirname, '../database/users.json')

const userBase= JSON.parse(fs.readFileSync(userData, 'utf-8'))


validacion = function(req,res,next){
    const validateUser = req.body;
    const user = userBase.find(user => user.email === validateUser.email);
    console.log('USER: ', user)
    if (user) {
        if (bcrypt.compareSync(validateUser.password, user.password)){
            res.cookie('auth', true)
            console.log("Contraseña validada")
        }
    }
}

module.exports=validacion;

