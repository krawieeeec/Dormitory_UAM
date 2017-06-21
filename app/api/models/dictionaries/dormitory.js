const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const dormitory = dbClient.define('Dormitory', {
    Adress: { type: sequelize.STRING, allowNull: false, unique: true }
})

module.exports = {
    DormitoryModel: dormitory
}