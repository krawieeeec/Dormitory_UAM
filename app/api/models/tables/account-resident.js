const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var accountResident = dbClient.define('accountResident', {
    UID: { type: sequelize.INTEGER, primaryKey: true},
    password: { type: sequelize.STRING(20), allowNull: false}
})

module.exports = {
    AccountResidentModel: accountResident
}