const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var resident = dbClient.define('resident', {
    name: { type: sequelize.STRING(30), allowNull: false, unique: false},
    surname: {type: sequelize.STRING(30), allowNull: false, unique: false},
    genre: {type: sequelize.ENUM('male', 'female'), allowNull: false, unique: false},
    birthDate: {type: sequelize.DATEONLY, allowNull: false, unique: false},
    birthPlace: {type: sequelize.STRING(30), allowNull:false, unique: false},
    motherName: {type: sequelize.STRING(30), allowNull: true},
    fatherName: { type: sequelize.STRING(30), allowNull: true},
    pesel: {type: sequelize.STRING(11), allowNull: false }
})



resident.ResidentAssociations = function(models) {
    resident.hasMany(models['document'], {foreignKey: {allowNull: false, name:'residentID'}});
    resident.hasMany(models['stayResident'], {foreignKey:{allowNull: false, name:'residentID'}});
    resident.hasMany(models['accountResident'], {foreignKey: {allowNull: false, name:'residentID'}});
    resident.hasMany(models['adressResident'], {foreignKey: {allowNull: false, name:'residentID'}});
    
}

module.exports = {
    ResidentModel: resident
}