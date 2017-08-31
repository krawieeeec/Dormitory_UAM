const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var dormitoryModel = dbClient.define('dormitory', {
    name: {type: sequelize.STRING, allowNull: false, unique: true, field: 'name'},
    address: { type: sequelize.STRING, allowNull: false}
}, {timestamps: false, underscored: true, underscoredAll: true})

dormitoryModel.DormitoryAssociations = function(models){
    dormitoryModel.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'dormitory_id'}});
    dormitoryModel.hasMany(models['accountResident'], {foreignKey:{allowNull: false, name: 'dormitory_id'}})
   
}

module.exports = {
    DormitoryModel: dormitoryModel
}