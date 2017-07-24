const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

const cityModel = dbClient.define('city', {
    nameCity: { type: sequelize.STRING(30), allowNull: false, field: 'name_city'},
    postCode: { type: sequelize.STRING(10), allowNull: false, field: 'post_code'},
    region: { type: sequelize.STRING(20), allowNull: false, field: 'region'}, 
}, {timestamps: true, underscored: true, underscoredAll: true})


module.exports = {
    CityModel : cityModel
}