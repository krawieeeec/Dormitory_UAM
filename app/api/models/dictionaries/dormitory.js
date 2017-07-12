const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var dormitory = dbClient.define('dormitory', {
    dormitoryName: {type: sequelize.STRING, allowNull: false, unique: true},
    adress: { type: sequelize.STRING, allowNull: false, unique: true },
    temporaryAccommodation: {type: sequelize.STRING}

})

dormitory.DormitoryAssociations = function(models){
    dormitory.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'dormitoryID'}});
    dormitory.hasMany(models['accountResident'], {foreignKey: 'dormitoryID'})
   
}

module.exports = {
    DormitoryModel: dormitory
}