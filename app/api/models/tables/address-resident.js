const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var addressResidentModel = dbClient.define('addressResident', {
    country: { type: sequelize.STRING(15), allowNull: false},
    street: { type: sequelize.STRING(40), allowNull: true},
    houseNumber: { type: sequelize.TEXT, allowNull: false, field: 'house_number'},
    apartmentNumber: { type: sequelize.TEXT, allowNull: true, field: 'apartment_number'},
    postCode: { type: sequelize.STRING(10), allowNull: false, field: 'post_code'},
    city: { type: sequelize.STRING(30), allowNull: false}
}, {timestamps: false, underscored: true, underscoredAll: true}) 

    
addressResidentModel.AddressResidentAssociations = function(models){

    addressResidentModel.hasMany(models['stayResident'], {foreignKey: {allowNull: true, name:'temp_address_id'}});
    addressResidentModel.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'regular_address_id'}});
   
}

module.exports = {
    AddressResidentModel : addressResidentModel
}