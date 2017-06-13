const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const document = dbClient.define('Document', {
    Name_Document: { type: Sequelize.STRING, allowNull: false, unique:true },
    Release_Date: { type: Sequelize.DATEONLY, allowNull: false },
    Expiration_Date: { type: Sequelize.DATEONLY, allowNull: false },
    Issuing_Country: { type: Sequelize.STRING(30), allowNull: false }
})
