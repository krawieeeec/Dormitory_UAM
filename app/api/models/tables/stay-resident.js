const Sequelize = require('sequelize');
const dbClient = ('../../common/db.js').dbClient;

const stayResident = dbClient.define('Stay_Resident', {
    Date_Arrival: { type: Sequelize.DATEONLY, allowNull: false},
    Time_Visit: { type: Sequelize.DATEONLY, allowNull: false},
    Data_Check_Out: { type: Sequelize.DATEONLY, allowNull: false},
    Room_Number: { type: Sequelize.INTEGER(4), allowNull: false},
    Date_Cross_RP: { type: Sequelize.DATEONLY, allowNull: true},
    Comments: { type: Sequelize.STRING, allowNull: true}
})

module.exports = {
    StayResidentModel = stayResident
}