const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var typeAdressModel = dbClient.define('typeAdress', {
    adress: {type: sequelize.STRING, allowNull: false, unique: true}
}, {timestamps: false, underscored: true, underscoredAll: true})

typeAdressModel.TypeAdressAssociations = function(models){
    typeAdressModel.hasMany(models['adressResident'], {foreignKey: {allowNull: false, name:'type_adress_id'}});
}

module.exports = {
    TypeAdressModel: typeAdressModel,
    
}
