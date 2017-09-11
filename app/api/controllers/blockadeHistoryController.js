const sequelize = require('../config/db.js').dbClient;
const blockadeHistoryTable = require('../models/models.js').DataBaseModels["blockadeHistory"];

var blockadeHistoryController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newBlockade = {
            comment: req.body.comment, 
            blockadeType: req.body.blockade_type,
            account_resident_id: req.body.account_resident_id,
            employee_id: req.body.employee_id,
            stay_resident_id: req.body.stay_resident_id

        }
        req.newBlockade = newBlockade;
        next();
    },

    GetAllBlokckadeHistory: function(req, res){
        blockadeHistoryTable.findAll()
        .then(blockades =>{
            if(blockades.length == 0){
                res.send([])
            } else{
                res.status(200);
                res.send(blockades);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },
    
    GetAllAccountResidentBlockadeHistoryById: function(req, res) {
        
        let residentId = req.params.residentId;
        let dormitoryId = req.params.dormitoryId;

        
        sequelize.query(
            'SELECT blockade_histories.id, blockade_type, comment, name, surname, account_employees.id as employee_id ' + 
            'FROM blockade_histories ' +
            'INNER JOIN account_residents on account_resident_id = account_residents.id ' +
            'INNER JOIN account_employees on account_employees.id = blockade_histories.employee_id ' + 
            'WHERE account_residents.resident_id = :residentId AND account_residents.dormitory_id = :dormitoryId',
            {replacements: {residentId: residentId, dormitoryId: dormitoryId}, type: sequelize.QueryTypes.SELECT }).
                then(accountBlockades => {
                    if(accountBlockades.length == 0){
                        res.status(200);
                        res.send([]);
                    }else{
                        res.status(200);
                        res.send(accountBlockades);
                    }
                })
    },

    CreateNewAccountResidentBlockade: function(req, res){
        
        blockadeHistoryTable.create(req.newBlockade)
        .then((newAccountResidentBlockade) => {
                res.send(newAccountResidentBlockade);
            }).catch(error => {
                res.send(error);
        })
    },
    DeleteAccountResidentBlockadeById: function(req, res){

        let blockadeId = req.params.id;

        blockadeHistoryTable.findOne({
            where: {
                id: blockadeId
            }
        }).then(blockade =>{
            if(blockade != null){
                blockade.destroy()
                .then(()=>{
                    res.sendStatus(blockade);
                }).catch((error)=>{
                   res.send(error);
                })
            }else{
                res.sendStatus(404);
            }
             
            
        })
    }
}

module.exports = {
    BlockadeHistoryController: blockadeHistoryController
}

