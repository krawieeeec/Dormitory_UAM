const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const city = dbClient.define('City', {
    Name_City: { type: sequelize.STRING(30), allowNull: false, unique: true},
    Post_Code: { type: sequelize.STRING(10), allowNull: false},
    Region: { type: sequelize.STRING(20), allowNull: false}
})


module.exports = {
    CityModel : city
}