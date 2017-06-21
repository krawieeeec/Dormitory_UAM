const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var typeAdress = dbClient.define('Type_Adress', {
    Adress: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
})


typeAdress.TypeAdressAssociations = function(models){
    typeAdress.hasMany(models['Type_Adress'], {foreignKey: 'Type_Adress_ID', as: 'TypeAdress'});

}

module.exports = {
    TypeAdressModel: typeAdress,
    
}
