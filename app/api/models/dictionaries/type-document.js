const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

var typeDocument = dbClient.define('Type_Document', {
    Type_Document: { type: sequelize.STRING(30), allowNull: false, unique: true }
})
   
typeDocument.TypeDocumentAssociations = function(models){
    typeDocument.hasMany(models['Document'], {foreignKey:'Type_Document_ID'});
}

module.exports = {
    TypeDocumentModel : typeDocument
}