const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var dormitory = dbClient.define('Dormitory', {
    Dormitory_Name: {type: sequelize.STRING, allowNull: false, unique: true},
    Adress: { type: sequelize.STRING, allowNull: false, unique: true },
    Temporary_Accommodation: {type: sequelize.STRING}

})

dormitory.DormitoryAssociations = function(models){
    dormitory.hasMany(models['Stay_Resident'], {foreignKey: 'Dormitory_ID'});
    dormitory.hasMany(models['Account_Resident'], {foreignKey: 'Dormitory_ID'})
}

module.exports = {
    DormitoryModel: dormitory
}