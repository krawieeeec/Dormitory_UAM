const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var accountEmployeeModel = dbClient.define('accountEmployeeModel', {
    name: 
    { 
        type: sequelize.STRING(20), 
        allowNull: false
    },
    surname: 
    { 
        type: sequelize.STRING(20), 
        allowNull: false, 
    },
    login: 
    {
        type: sequelize.STRING(20), 
        allowNull: false, 
    },
    password:{
        type: sequelize.STRING(20),
        allowNull: false
    }
}, {
    timestamps: false, 
    underscored: true, 
    underscoredAll: true
})

accountEmployeeModel.AccountEmployeeAssociations = function(models){
    
    accountEmployeeModel.hasMany(models['blockadeHistory'], {
        foreignKey: {
            allowNull: false, 
            name:'employee_id'
        }
    });
       
    }

module.exports = {
    AccountEmployeeModel: accountEmployeeModel
}