const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var dormitoryModel = dbClient.define('dormitory', {
    dormitoryName: {type: sequelize.STRING, allowNull: false, unique: true, field: 'dormitory_name'},
    adress: { type: sequelize.STRING, allowNull: false},
    temporaryAccommodation: {type: sequelize.STRING, field: 'temporary_accomodation'},
}, {timestamps: false, underscored: true, underscoredAll: true})

dormitoryModel.DormitoryAssociations = function(models){
    dormitoryModel.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'dormitory_id'}});
    dormitoryModel.hasMany(models['accountResident'], {foreignKey: 'dormitory_id'})
   
}

module.exports = {
    DormitoryModel: dormitoryModel
}