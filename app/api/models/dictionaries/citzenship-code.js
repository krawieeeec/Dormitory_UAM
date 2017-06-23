const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var citzenshipCode = dbClient.define('Citzenship_Code', {
    Citzenship: { type: sequelize.STRING(30), allowNull: false, unique: true },
    Country: { type: sequelize.STRING(30), allowNull: false, unique: true }
})

citzenshipCode.CitzenshipCodeAssociations =  function(models){
    citzenshipCode.hasMany(models['Resident'], {foreignKey: 'Citzenship_Code_ID'});     
} 


module.exports = {
    CitzenshipCodeModel: citzenshipCode
}