module.exports= function(sequelize, dataTypes){
    let alias = 'Cart'

    cols= {
        id:{
            type:dataTypes.INTEGER(10),
            primaryKey:'true',
            autoIncrement:'true'
        },
        user_id:{
            type:dataTypes.INTEGER(10),
            undefined:'true'
        },
        product_id:{
            type:dataTypes.INTEGER(10),
            undefined:'true'
        },
        total:{
            type:dataTypes.DECIMAL(7,2)
        }
    }

    let config = {
        tableNAme:'carts',
        timestamps:false
    }


    let Cart=sequelize.define(alias, cols, config);

    Cart.associate= function(models){

        Cart.hasMany(models.Product,{
            as: 'products',
            foreingKey :'product_id'
        });
        Cart.hasMany(models.User,{
            as: 'users',
            foreingKey :'user_id'
        });
    }

    return Cart;
}