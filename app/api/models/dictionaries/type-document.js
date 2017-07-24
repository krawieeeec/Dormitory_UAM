const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var typeDocumentModel = dbClient.define('typeDocument', {
    typeDocument: { type: sequelize.STRING(30), allowNull: false, unique: true, field:'type_document' }
}, {timestamps: false, underscored: true, underscoredAll: true})
   
typeDocumentModel.TypeDocumentAssociations = function(models){
    typeDocumentModel.hasMany(models['document'], {foreignKey: {allowNull: false, name:'type_document_id'}});
}

module.exports = {
    TypeDocumentModel : typeDocumentModel
}