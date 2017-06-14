const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const resident = dbClient.define('Resident', {
    Name: { type: Sequelize.STRING(30), allowNull: false, unique: false, 
        validate: {
            isEmail: true, isInt: true
    }},
    Surname: {type: Sequelize.STRING(30), allowNull: false, unique: false},
    Genre: {type: Sequelize.ENUM('male', 'female'), allowNull: false, unique: false},
    Date_Birth: {type: Sequelize.DATEONLY, allowNull:false, unique: false},
    Place_Brith: {type: Sequelize.STRING(30), allowNull:false, unique: false},
    Mother_Name: {type: Sequelize.STRING(30), allowNull: true},
    Father_Name: { type: Sequelize.STRING(30), allowNull: true},
    PESEL: {type: Sequelize.INT(12), allowNull: false, }
})

module.exports = {
    ResidentModel = resident
}