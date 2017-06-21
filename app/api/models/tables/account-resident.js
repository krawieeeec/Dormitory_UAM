const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var accountResident = dbClient.define('Account_Resident', {
    Password: { type: sequelize.STRING(20), allowNull: false}
})

module.exports = {
    AccountResidentModel: accountResident
}