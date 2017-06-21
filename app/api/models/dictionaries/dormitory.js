const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var dormitory = dbClient.define('Dormitory', {
    Adress: { type: sequelize.STRING, allowNull: false, unique: true }
})

dormitory.DormitoryAssociations = function(models){
    dormitory.hasMany(models['Stay_Resident'], {foreignKey: 'Dormitory_ID'});
    dormitory.hasMany(models['Account_Resident'], {foreignKey: 'Dormitory_ID'})
}

module.exports = {
    DormitoryModel: dormitory
}