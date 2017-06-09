const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const typeDocument = dbClient.define('Type_Document', {
    Name_Document: { type: Sequelize.STRING, allowNull: false, unique:true} ,
    Relase_Date: {type: Sequelize.DATEONLY, allowNull: false},
    Expiration_Date: {type: Sequelize.DATEONLY, allowNull: false},
    Issuing_Country: {type: Sequelize.STRING(30), allowNull: false}
})

typeDocument.sync();