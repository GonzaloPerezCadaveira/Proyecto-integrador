module.exports= function(sequelize, dataTypes){
    let alias = 'User'

    cols= {
        id:{
            type:dataTypes.INTEGER(10),
            primaryKey:'true',
            autoIncrement:'true'
        },
        user_name:{
            type:dataTypes.STRING(100)
        },
        user_email:{
            type:dataTypes.STRING(100)
        },
        user_password:{
            type:dataTypes.STRING(100)
        },
        user_img:{
            type:dataTypes.STRING(100)
        },
        user_cat:{
            type: dataTypes.INTEGER(10)
        }
    }

    let config = {
        tableName:'users',
        timestamps:false
    }


    let User=sequelize.define(alias, cols, config);

    User.associate= function(models){
        User.belongsToMany(models.Product,{
            as: 'products',
            through:'carts',
            foreingKey:'user_id',
            otherKey:'product_id'
        })
        User.belongsTo(models.Cart,{
            as: 'carts',
            foreingKey:'user_id'
        })
    }

    return User;
}