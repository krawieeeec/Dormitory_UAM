const blockadeHistoryTable = require('../models/models.js').DataBaseModels["blockadeHistory"];

var blockadeHistoryController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newBlockade = {
            comment: req.body.comment, 
            blockadeHisotry: req.body.blockadeHistory,
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
        
        let accountResidentId = req.params.id;

        blockadeHistoryTable.findAll({
            where:{
                account_resident_id:accountResidentId
            }
        }
        )
        .then((blockades) =>{
            if(blockades.length == 0)
                res.send([])
            else{
                res.send(JSON.stringify(blockades));
            }
        }).catch(error => {
            res.send(error);
        })
    },
}

module.exports = {
    BlockadeHistoryController: blockadeHistoryController
}

