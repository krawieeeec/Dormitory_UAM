const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var residentModel = dbClient.define('resident', {
    name: { type: sequelize.STRING(30), allowNull: false, unique: false},
    surname: {type: sequelize.STRING(30), allowNull: false, unique: false},
    genre: {type: sequelize.ENUM('Kobieta', 'Mężczyzna'), allowNull: false, unique: false},
    phoneNumber: {type: sequelize.INTEGER, allowNull: true, unique: false, field: 'phone_number'},
    birthDate: {type: sequelize.DATEONLY, allowNull: false, unique: false, field: 'birth_date'},
    birthPlace: {type: sequelize.STRING(30), allowNull:false, unique: false, field: 'birth_place'},
    motherName: {type: sequelize.STRING(30), allowNull: true, field: 'mother_name'},
    fatherName: { type: sequelize.STRING(30), allowNull: true, field: 'father_name'},
    pesel: {type: sequelize.STRING(11), allowNull: false },
}, {timestamps: false, underscored: true, underscoredAll: true})


residentModel.ResidentAssociations = function(models) {
    residentModel.hasMany(models['document'], {foreignKey: {allowNull: false, name:'resident_id'}});
    residentModel.hasMany(models['stayResident'], {foreignKey:{allowNull: false, name:'resident_id'}});
    residentModel.hasMany(models['accountResident'], {foreignKey: {allowNull: false, name:'resident_id'}});
    residentModel.hasMany(models['addressResident'], {foreignKey: {allowNull: false, name:'resident_id'}});
    
}

module.exports = {
    ResidentModel: residentModel
}