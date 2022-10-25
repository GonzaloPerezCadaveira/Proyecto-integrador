const path=require("path");
const fs= require('fs');
const db = require('../database/models')

const productoData= path.join(__dirname, '../database/productsData.json')

const productoBase= JSON.parse(fs.readFileSync(productoData, 'utf-8'))

const controller={
    home: (req, res)=>{
        const usuario=req.session.userLogged
        if(usuario){
            db.User.findOne({
                where:{id:usuario.id}
            })
            .then(function(user){
                res.render('index', {
                    productoBase,
                    titulo:'Carpincho Drinks',
                    enlace:'/css/index.css',
                    user
                });
            })
        }
        else{
            db.Product.findAll()
            .then(function(productos){
            res.render('index', {
                productoBase,
                titulo:'Carpincho Drinks',
                enlace:'/css/index.css',
                productos
            })
        })
        }
    }

};

module.exports=controller;