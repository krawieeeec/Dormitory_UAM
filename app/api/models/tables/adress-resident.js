const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var adressResident = dbClient.define('adressResident', {
    country: { type: sequelize.STRING(15), allowNull: false},
    street: { type: sequelize.STRING(40), allowNull: true},
    houseNumber: { type: sequelize.TEXT, allowNull: false},
    apartmentNumber: { type: sequelize.TEXT, allowNull: true},
    postCode: { type: sequelize.STRING(10), allowNull: false},
    city: { type: sequelize.STRING(30), allowNull: false}
}) 

    
adressResident.AdressResidentAssociations = function(models){

    adressResident.hasMany(models['stayResident'], {foreignKey: {allowNull: true, name:'tempAdressID'}});
    adressResident.hasMany(models['stayResident'], {foreignKey: {allowNull: true, name:'regularAdressID'}});
   
}

module.exports = {
    AdressResidentModel : adressResident
}