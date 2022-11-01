const db = require('../../database/models')
const { Op } = require("sequelize");

const controllerApi={
    list:(req,res)=>{
        db.Product.findAll()
        .then(function (productos) {
            res.status(200).json({
                quantity: productos.length,
                products: productos,
                status:200
            })
        })
    },
    detail:(req,res)=>{
        db.Product.findOne({
            where:{id:req.params.id}
        })
        .then(function (producto) {
            res.status(200).json({
                product: producto,
                status:200
            })
        })
    }
}

module.exports=controllerApi;