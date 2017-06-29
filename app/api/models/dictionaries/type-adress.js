const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var typeAdress = dbClient.define('typeAdress', {
    adress: {type: sequelize.STRING, allowNull: false, unique: true}
})

typeAdress.TypeAdressAssociations = function(models){
    typeAdress.hasMany(models['adressResident'], {foreignKey: {allowNull: false, name:'typeAdressID'}});
}

module.exports = {
    TypeAdressModel: typeAdress,
    
}
