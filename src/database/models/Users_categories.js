module.exports= function(sequelize, dataTypes){
    let alias = 'User_Category',

    cols= {
        id:{
            type:dataTypes.INTEGER(10),
            undefined: 'true',
            autoIncrement:'true',
            primaryKey:'true'
        },
        name_category:{
            type:dataTypes.STRING(100)
        }
    }

    let config = {
        tableName:'users_categories',
        timestamps:false
    }


    let User_Category=sequelize.define(alias, cols, config);

    User_Category.associate= function(models){
        User_Category.belongsTo(models.User,{
            as: 'users',
            foreingKey :'user_cat'
        });
    }

    return User_Category;
}