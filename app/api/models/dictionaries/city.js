const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

const city = dbClient.define('city', {
    nameCity: { type: sequelize.STRING(30), allowNull: false, unique: true},
    postCode: { type: sequelize.STRING(10), allowNull: false},
    region: { type: sequelize.STRING(20), allowNull: false}, 
})


module.exports = {
    CityModel : city
}