const sequelize = require('../config/db.js').dbClient;
const dormitoryTable = require('../models/models.js').DataBaseModels["dormitory"];
const stayResidentTable = require('../models/models.js').DataBaseModels["stayResident"];


var dormitoryController = {

    FormResponseObject: function(req, res, next){

        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },

    GetAllDormitories: function(req, res){
        
        dormitoryTable.findAll({attributes: ['id','name', 'address']})
            .then((dormitories) => {
                if(dormitories.length == 0){
                    res.send('There aren\'t any entries in dormitories table.')
                }
                else{
                    console.log(dormitories);
                    res.status(200);
                    res.send(JSON.stringify(dormitories));
                }
            })
            .catch((error) => {
                res.send(error);
            })
    },

    GetAllResidentsOfDormitory: function(req, res){

        let dormitoryId = req.params.id

        sequelize.query(
            'SELECT residents.id, name, surname, room_number, date_of_arrival, date_of_departure, account_state '+
            'FROM (residents INNER JOIN account_residents on residents.id = account_residents.resident_id) ' +
            'INNER JOIN stay_residents on account_residents.stay_resident_id = stay_residents.id ' +
            'WHERE account_residents.dormitory_id = :id ',
            {replacements: {id: dormitoryId}, type: sequelize.QueryTypes.SELECT }).
                then(residents => {
                    console.log(residents);
                    if(residents.length > 0){
                        res.status(200);
                        res.send(JSON.stringify(residents));
                    }else{
                        res.status(200);
                        res.send([]);
                    }
                })
    }
}

module.exports = {
    DormitoryController : dormitoryController
}