const sequelize = require('../config/db.js').dbClient;
const dormitoryTable = require('../models/models.js').DataBaseModels["dormitory"];
const stayResidentTable = require('../models/models.js').DataBaseModels["stayResident"];


var dormitoryController = {

    FormResponseObject: function(req, res, next){

        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },

    GetAllDormitories: function(req, res){
        dormitoryTable.findAll({attributes: ['id','dormitoryName', 'adress']})
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
            'SELECT residents.id, residents.name, residents.surname, stay_residents.room_number ' + 
            'FROM residents INNER JOIN stay_residents ON stay_residents.resident_id = residents.id WHERE residents.id ' + 
            'IN (SELECT resident_id FROM stay_residents WHERE dormitory_id = :id)',
            {replacements: {id: dormitoryId}, type: sequelize.QueryTypes.SELECT }).
                then(residents => {
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