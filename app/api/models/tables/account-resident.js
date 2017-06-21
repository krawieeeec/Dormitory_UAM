const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var accountResident = dbClient.define('Account_Resident', {
    Password: { type: sequelize.STRING(20), allowNull: false}
})


accountResident.AccountResidentAssociations = function(models){

    accountResident.hasMany(models['Dormitory'], {foreignKey: 'Dormitory_ID'});
    accountResident.hasOne(models['Resident']);
    
}

module.exports = {
    AccountResidentModel: accountResident
}