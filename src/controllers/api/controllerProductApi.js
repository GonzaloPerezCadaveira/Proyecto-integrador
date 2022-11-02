const db = require('../../database/models')
const { Op } = require("sequelize");

const controllerApi={
    list:(req,res)=>{
        let productos =db.Product.findAll()
        let categorias=db.Category.findAll()
        Promise.all([productos,categorias])
        .then(function ([products,categories]){
            let respuesta = {
                meta:{
                    status: 200,
                    count: products.length,
                    url: "/api/products/" + products.id
                },
                countByCategory:
                    categories.map(function(categoria,i){
                        let total=categories.map(function(categoria){
                            let acum=0
                            products.forEach(producto => {
                                if(producto.cat_id==categoria.id){
                                    acum++
                                }
                            })
                            return acum
                        });
                        return {
                            cat_name:categoria.cat_name,
                            tot:total[i]
                        }
                    }),
                products:products.map(function(producto){
                    return{
                        id:producto.id,
                        name:producto.name,
                        description:producto.description,
                        relation:'categories',
                        detail:'/products/detail/'+producto.id
                    }
                    
                })
                
            }
            res.status(200).json(respuesta)
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