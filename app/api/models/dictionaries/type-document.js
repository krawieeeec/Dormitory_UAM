const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const typeDocument = dbClient.define('Type_Document', {
    Type_Document: { type: Sequelize.STRING(30), allowNull: false, unique: true }
})

typeDocument.sync();