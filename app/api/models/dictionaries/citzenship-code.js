const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var citzenshipCodeModel = dbClient.define('citzenshipCode', {
    citzenship: { type: sequelize.STRING(30), allowNull: false, unique: true},
    country: { type: sequelize.STRING(30), allowNull: false, unique: true}
}, {timestamps: false, underscored: true, underscoredAll: true})

citzenshipCodeModel.CitzenshipCodeAssociations =  function(models){
    citzenshipCodeModel.hasMany(models['resident'], {foreignKey: {allowNull: false, name:'citzenship_code_id'}});  
} 


module.exports = {
    CitzenshipCodeModel: citzenshipCodeModel
}