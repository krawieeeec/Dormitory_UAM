const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var adressResident = dbClient.define('adressResident', {
    country: { type: sequelize.STRING(15), allowNull: false},
    street: { type: sequelize.STRING(40), allowNull: false},
    houseNumber: { type: sequelize.INTEGER, allowNull: false},
    apartmentNumber: { type: sequelize.INTEGER, allowNull: false},
    postCode: { type: sequelize.STRING(10), allowNull: false},
    city: { type: sequelize.STRING(30), allowNull: false}
}) 

    
adressResident.AdressResidentAssociations = function(models){

    adressResident.hasMany(models['stayResident'], {foreignKey: 'timeReportID'});
    adressResident.hasMany(models['stayResident'], {foreignKey: 'regularReportID'});
    adressResident.hasMany(models['resident'], {foreignKey: {allowNull: false, name: 'adressID' }});
   
}

module.exports = {
    AdressResidentModel : adressResident
}