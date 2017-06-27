const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var resident = dbClient.define('Resident', {
    Name: { type: sequelize.STRING(30), allowNull: false, unique: false},
    Surname: {type: sequelize.STRING(30), allowNull: false, unique: false},
    Genre: {type: sequelize.ENUM('male', 'female'), allowNull: false, unique: false},
    Birth_Date: {type: sequelize.DATEONLY, allowNull: false, unique: false},
    Birth_Place: {type: sequelize.STRING(30), allowNull:false, unique: false},
    Mother_Name: {type: sequelize.STRING(30), allowNull: true},
    Father_Name: { type: sequelize.STRING(30), allowNull: true},
    PESEL: {type: sequelize.STRING, allowNull: false }
})



resident.ResidentAssociations = function(models) {
    resident.hasMany(models['Document'], {foreignKey:'Resident_ID'});
    resident.hasMany(models['Stay_Resident'], {foreignKey:'Resident_ID'});
    resident.hasMany(models['Account_Resident'], {foreignKey: 'Resident_ID'});
    
}

module.exports = {
    ResidentModel: resident
}