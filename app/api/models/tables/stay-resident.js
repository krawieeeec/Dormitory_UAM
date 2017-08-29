const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var stayResidentModel = dbClient.define('stayResident', {
    dateOfArrival: { type: sequelize.DATEONLY, allowNull: false, field: 'date_of_arrival' },//change on DATE -> timestamp
    dateOfDeparture: { type: sequelize.DATEONLY, allowNull: false, field: 'date_of_departure' },//change on DATE -> timestamp
    dateOfTempDeparture: { type: sequelize.DATEONLY, allowNull: true, field: 'date_of_temp_departure' },//change on DATE -> timestamp
    roomNumber: { type: sequelize.INTEGER, allowNull: false, field: 'room_number' },
    dateCrossRp: { type: sequelize.DATEONLY, allowNull: true, field: 'date_cross_rp' },
    comments: { type: sequelize.STRING, allowNull: true }
}, {timestamps: false, underscored: true, underscoredAll: true})

    
stayResidentModel.StayResidentAssociations = function(models){
    
    stayResidentModel.hasMany(models['blockadeHistory'], {
        foreignKey: {
            allowNull: false, 
            name:'stay_resident_id'
        }
    });   
    }

module.exports = {
    StayResidentModel : stayResidentModel
}