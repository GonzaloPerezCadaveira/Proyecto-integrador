const db = require('../../database/models')
const { Op } = require("sequelize");

const controllerApi={
    list:(req,res)=>{
        db.User.findAll()
        .then(function (usuarios) {
            let respuesta = {
                meta: {
                    status: 200,
                    count: usuarios.length,
                    url: "/api/users"
                },
                users: usuarios.map(user => {
                    return{
                        id: user.id,
                        user_name: user.user_name,
                        user_email: user.user_email,
                        user_img: "/img/avatar/" + user.user_img,
                        detail: "/api/user/" + user.id
                    }
                })
            }
            res.status(200).json(respuesta)
        })
    },
    detail:(req,res)=>{
        db.User.findOne({
            where:{id:req.params.id}
        })
        .then(user=>{
            let respuesta = {
                meta:{
                    status: 200,
                    url: "/api/user/" + user.id
                },
                user: {
                        id: user.id,
                        user_name: user.user_name,
                        user_email: user.email,
                        user_img: "/img/avatar/" + user.user_img,
                    }
            }
            res.json(respuesta)
        })

    }
}

module.exports=controllerApi;