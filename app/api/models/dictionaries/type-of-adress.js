const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const typeOfAdress = dbClient.define('Type_Of_Adress', {
    adress: { type: Sequelize.STRING, allowNull: false, unique: true}
})

