const sequelize = require('sequelize');
const dbClient = require('../../config/db.js').dbClient;

var blockadeHistoryModel = dbClient.define('blockadeHistory', {
    comment: { 
        type: sequelize.TEXT, 
        allowNull: false
    },
    blockadeType: { 
        type: sequelize.ENUM, 
        values: ['Stały', 'Okresowy'], 
        allowNull: false, 
        field: 'blockade_type'
    }
}, {
    timestamps: false, 
    underscored: true, 
    underscoredAll: true
}); 

module.exports = {
    BlockadeHistoryModel : blockadeHistoryModel
}