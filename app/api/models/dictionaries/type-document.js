const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var typeDocument = dbClient.define('typeDocument', {
    typeDocument: { type: sequelize.STRING(30), allowNull: false, unique: true }
})
   
typeDocument.TypeDocumentAssociations = function(models){
    typeDocument.hasMany(models['document'], {foreignKey: {allowNull: false, name:'typeDocumentID'}});
}

module.exports = {
    TypeDocumentModel : typeDocument
}