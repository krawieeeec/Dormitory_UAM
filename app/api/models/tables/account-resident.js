const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var accountResidentModel = dbClient.define('accountResident', {
    UID: { type: sequelize.INTEGER, primaryKey: true },
    password: { type: sequelize.STRING(20), allowNull: false},
    dateOfValidityAccount: { type: sequelize.DATE, allowNull: false, field: 'date_of_validity_account' },
    blockade: { type: sequelize.ENUM('none', 'admin', 'sys', 'user'), allowNull: false},
    reasonOfBlockade: { type: sequelize.STRING, allowNull: true, field: 'reason_of_blockade' }
}, {timestamps: false, underscored: true, underscoredAll: true})

module.exports = {
    AccountResidentModel: accountResidentModel
}