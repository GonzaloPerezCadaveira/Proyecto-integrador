const db = require('../../database/models')
const { Op } = require("sequelize");

const controllerApi={
    list:(req,res)=>{
        db.User.findAll()
        .then(function (usuarios) {
            res.status(200).json({
                quantity: usuarios.length,
                users: usuarios,
                status:200
            })
        })
    },
    detail:(req,res)=>{
        db.User.findOne({
            where:{id:req.params.id}
        })
        .then(function (usuario) {
            res.status(200).json({
                user: usuario,
                status:200
            })
        })
    }
}

module.exports=controllerApi;