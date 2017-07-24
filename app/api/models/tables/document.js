const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var documentModel = dbClient.define('document', {
    documentName: { type: sequelize.STRING, allowNull: false, field: 'document_number' },
    releaseDate: { type: sequelize.DATEONLY, allowNull: false, field: 'release_date' },
    expirationDate: { type: sequelize.DATEONLY, allowNull: false, field: 'expiration_date' },
    issuingCountry: { type: sequelize.STRING(30), allowNull: true, field: 'issuing_country' }
}, {timestamps: false, underscored: true, underscoredAll: true})

documentModel.DocumentAssociations = function(models){
    
    documentModel.hasMany(models['stayResident'], {foreignKey: {allowNull: false, name:'document_id'}});
}

module.exports = {
    DocumentModel : documentModel
}