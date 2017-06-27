const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var typeAdress = dbClient.define('Type_Adress', {
    Adress: {type: sequelize.STRING, allowNull: false, unique: true}
})

typeAdress.TypeAdressAssociations = function(models){
    typeAdress.hasMany(models['Adress_Resident'], {foreignKey: {allowNull: false, name:'Type_Adress_ID'}});
}

module.exports = {
    TypeAdressModel: typeAdress,
    
}
