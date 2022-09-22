module.exports= function(sequelize, dataTypes){
    let alias = 'Category',

    cols= {
        id:{
            type:dataTypes.INTEGER(10),
            undefined: 'true',
            autoIncrement:'true',
            primaryKey:'true'
        },
        cat_name:{
            type:dataTypes.STRING(100)
        }
    }

    let config = {
        tableName:'categories',
        timestamps:false
    }


    let Category=sequelize.define(alias, cols, config);

    Category.associate= function(models){
        Category.belongsTo(models.Product,{
            as: 'products',
            foreingKey :'cat_id'
        });
    }

    return Category;
}