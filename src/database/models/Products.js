module.exports= function(sequelize, dataTypes){
    let alias = 'Product'

    cols= {
        id:{
            type:dataTypes.INTEGER(10),
            primaryKey:'true',
            undefined:'true',
            autoIncrement:'true'
        },
        description:{
            type:dataTypes.STRING(500)
        },
        img:{
            type:dataTypes.STRING(500)
        },
        discount:{
            type:dataTypes.INTEGER(10),
            undefined:'true'
        },
        quantity:{
            type:dataTypes.INTEGER(10),
            undefined:'true'
        },
        price:{
            type:dataTypes.DECIMAL(7,2),
            undefined:'true'
        },
        cat_id:{
            type:dataTypes.INTEGER(10),
            undefined:'true'
        },
        name:{
            type:dataTypes.STRING(100)
        }
    }

    let config = {
        tableName:'products',
        timestamps:false
    }


    let Product=sequelize.define(alias, cols, config);

    Product.associate= function(models){
        Product.belongsToMany(models.Cart,{
            as: 'users',
            through:'carts',
            foreingKey:'product_id',
            otherKey:'user_id'
        })
        Product.hasMany(models.Category,{
            as: 'categories',
            foreingKey :'cat_id'
        });
        Product.belongsTo(models.Cart,{
            as: 'carts',
            foreingKey :'product_id'
        });
    }

    return Product;
}