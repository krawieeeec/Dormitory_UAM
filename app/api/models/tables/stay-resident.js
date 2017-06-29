const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var stayResident = dbClient.define('stayResident', {
    dateArrival: { type: sequelize.DATEONLY, allowNull: false},
    timeVisit: { type: sequelize.DATEONLY, allowNull: false},
    dataCheckOut: { type: sequelize.DATEONLY, allowNull: false},
    roomNumber: { type: sequelize.INTEGER, allowNull: false},
    dateCrossRP: { type: sequelize.DATEONLY, allowNull: true},
    comments: { type: sequelize.STRING, allowNull: true}
})


module.exports = {
    StayResidentModel : stayResident
}