const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var stayResidentModel = dbClient.define('stayResident', {
    dateOfArrival: { type: sequelize.DATEONLY, allowNull: false, field: 'date_of_arrival' },//change on DATE -> timestamp
    timeVisit: { type: sequelize.DATEONLY, allowNull: false, field: 'time_visit' },
    dateOfDeparture: { type: sequelize.DATEONLY, allowNull: false, field: 'date_of_departure' },//change on DATE -> timestamp
    dateOfTempDeparture: { type: sequelize.DATEONLY, allowNull: true, field: 'date_of_temp_departure' },//change on DATE -> timestamp
    forecastCheckOut: { type: sequelize.DATEONLY, allowNull: true, field: 'forecast_check_out' },//change on DATE -> timestamp
    dateCheckOut: { type: sequelize.DATEONLY, allowNull: false, field: 'date_check_out' },
    roomNumber: { type: sequelize.INTEGER, allowNull: false, field: 'room_number' },
    dateCrossRP: { type: sequelize.DATEONLY, allowNull: true, field: 'date_cross_rp' },
    comments: { type: sequelize.STRING, allowNull: true }
}, {timestamps: false, underscored: true, underscoredAll: true})


module.exports = {
    StayResidentModel : stayResidentModel
}