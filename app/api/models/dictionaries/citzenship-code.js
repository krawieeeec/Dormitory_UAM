const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var citzenshipCode = dbClient.define('citzenshipCode', {
    citzenship: { type: sequelize.STRING(30), allowNull: false, unique: true },
    country: { type: sequelize.STRING(30), allowNull: false, unique: true }
})

citzenshipCode.CitzenshipCodeAssociations =  function(models){
    citzenshipCode.hasMany(models['resident'], {foreignKey: 'citzenshipCodeID'});  
} 


module.exports = {
    CitzenshipCodeModel: citzenshipCode
}