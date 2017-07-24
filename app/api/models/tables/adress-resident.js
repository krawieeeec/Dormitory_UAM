const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var adressResidentModel = dbClient.define('adressResident', {
    country: { type: sequelize.STRING(15), allowNull: false},
    street: { type: sequelize.STRING(40), allowNull: true},
    houseNumber: { type: sequelize.TEXT, allowNull: false, field: 'house_number'},
    apartmentNumber: { type: sequelize.TEXT, allowNull: true, field: 'apartment_number'},
    postCode: { type: sequelize.STRING(10), allowNull: false, field: 'post_code'},
    city: { type: sequelize.STRING(30), allowNull: false}
}, {timestamps: false, underscored: true, underscoredAll: true}) 

    
adressResidentModel.AdressResidentAssociations = function(models){

    adressResidentModel.hasMany(models['stayResident'], {foreignKey: {allowNull: true, name:'temp_adress_id'}});
    adressResidentModel.hasMany(models['stayResident'], {foreignKey: {allowNull: true, name:'regular_adress_id'}});
   
}

module.exports = {
    AdressResidentModel : adressResidentModel
}