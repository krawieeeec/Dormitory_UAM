const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var accountResident = dbClient.define('accountResident', {
    password: { type: sequelize.STRING(20), allowNull: false}
})

module.exports = {
    AccountResidentModel: accountResident
}