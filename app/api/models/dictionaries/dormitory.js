const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const dormitory = dbClient.define('Dormitory', {
    Adress: { type: Sequelize.STRING, allowNull: false, unique: true }
})

dormitory.synch();