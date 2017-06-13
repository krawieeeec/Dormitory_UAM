const sequelize = require('sequelize');
const dbClient = require('../../common/db.js');

const accountResident = dbClient.define('Account_Resident', {
    Password: { type: sequelize.STRING(20), allowNull: false}
})