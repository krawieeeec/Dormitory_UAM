const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var document = dbClient.define('Document', {
    Name_Document: { type: sequelize.STRING, allowNull: false, unique:true },
    Release_Date: { type: sequelize.DATEONLY, allowNull: false },
    Expiration_Date: { type: sequelize.DATEONLY, allowNull: false },
    Issuing_Country: { type: sequelize.STRING(30), allowNull: false }
})

document.DocumentAssociations = function(models){
    
    document.hasMany(models['Stay_Resident'], {foreignKey: 'Document_ID'});
}

module.exports = {
    DocumentModel : document
}