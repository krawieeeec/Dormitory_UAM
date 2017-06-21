const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var adressResident = dbClient.define('Adress_Resident', {
    Country: { type: sequelize.STRING(15), allowNull: false},
    Street: { type: sequelize.STRING(40), allowNull: false},
    House_Number: { type: sequelize.INTEGER, allowNull: false},
    Apartment_Number: { type: sequelize.INTEGER, allowNull: false},
    Post_Code: { type: sequelize.STRING(10), allowNull: false},
    City: { type: sequelize.STRING(30), allowNull: false}
}) 

    
adressResident.AdressResidentAssociations = function(models){

    adressResident.hasMany(models['Stay_Resident'], {foreignKey: 'Time_Report_ID'});
    adressResident.hasMany(models['Stay_Resident'], {foreignKey: 'Regular_Report_ID'});
    adressResident.hasMany(models['Resident'], {foreignKey: 'Adress_ID', as:'AdressResident'});
   
}

module.exports = {
    AdressResidentModel : adressResident
}