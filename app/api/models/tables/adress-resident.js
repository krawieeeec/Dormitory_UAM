const sequelize = require('sequelize');
const dbClient = require('../../common/db.js');

const adressResident = dbClient.define('Adress_Resident', {
    Country: { type: sequelize.STRING(15), allowNull: false},
    Street: { type: sequelize.STRING(40), allowNull: false},
    House_Number: { type: sequelize.INTEGER(3), allowNull: false},
    Apartment_Number: { type: sequelize.INTEGER(3), allowNull: false},
    Post_Code: { type: sequelize.STRING(10), allowNull: false},
    City: { type: sequelize.String(30), allowNull: false}
}) 

module.exports = {
    AdressResidentModel = adressResident
}