const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const citzenshipCode = dbClient.define('Citzenship_Code', {
    Citzenship: { type: Sequelize.STRING(30), allowNull: false, unique: true },
    Country: { type: Sequelize.STRING(30), allowNull: false, unique: true }
})