const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var accountResidentModel = dbClient.define('accountResident', {
    UID: 
    { 
        type: sequelize.INTEGER, 
    //    primaryKey: true,
        allowNull: true,
        field: 'uid'
       },
    password: 
    { 
        type: sequelize.STRING(20), 
        allowNull: true
    },
    validityAccountDate: 
    { 
        type: sequelize.DATEONLY, 
        allowNull: true, 
        field: 'validity_account_date' 
    },
    accountState: 
    {
        type: 
        sequelize.ENUM('Zablokowany', 'Odblokowany', 'Zablokowana', 'Odblokowana'), 
        allowNull: false, 
        field: 'account_state'
    }
}, {
    timestamps: false, 
    underscored: true, 
    underscoredAll: true
})

accountResidentModel.AccountResidentAssociations = function(models){
    
    accountResidentModel.hasMany(models['blockadeHistory'], {
        foreignKey: {
            allowNull: false, 
            name:'account_resident_id'
        }
    });       
}

module.exports = {
    AccountResidentModel: accountResidentModel
}