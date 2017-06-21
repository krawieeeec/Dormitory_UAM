const sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const stayResident = dbClient.define('Stay_Resident', {
    Date_Arrival: { type: sequelize.DATEONLY, allowNull: false},
    Time_Visit: { type: sequelize.DATEONLY, allowNull: false},
    Data_Check_Out: { type: sequelize.DATEONLY, allowNull: false},
    Room_Number: { type: sequelize.INTEGER, allowNull: false},
    Date_Cross_RP: { type: sequelize.DATEONLY, allowNull: true},
    Comments: { type: sequelize.STRING, allowNull: true}
})

module.exports = {
    StayResidentModel : stayResident
}