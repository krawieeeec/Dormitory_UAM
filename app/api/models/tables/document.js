const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var document = dbClient.define('document', {
    numberDocument: { type: sequelize.STRING, allowNull: false, unique:true },
    releaseDate: { type: sequelize.DATEONLY, allowNull: false },
    expirationDate: { type: sequelize.DATEONLY, allowNull: false },
    issuingCountry: { type: sequelize.STRING(30), allowNull: true }
})

document.DocumentAssociations = function(models){
    
    document.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'documentID'}});
}

module.exports = {
    DocumentModel : document
}