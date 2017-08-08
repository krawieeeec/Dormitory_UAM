const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var typeAddressModel = dbClient.define('typeAddress', {
    address: {type: sequelize.STRING, allowNull: false, unique: true}
}, {timestamps: false, underscored: true, underscoredAll: true})

typeAddressModel.TypeAddressAssociations = function(models){
    typeAddressModel.hasMany(models['addressResident'], {foreignKey: {allowNull: false, name:'address_type_id'}});
}

module.exports = {
    TypeAddressModel: typeAddressModel,
    
}
