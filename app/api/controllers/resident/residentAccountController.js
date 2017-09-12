const sequelize = require('../../config/db.js').dbClient;
const residentAccountTable = require('../../models/models.js').DataBaseModels["accountResident"];

var residentAccountController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResidentAccount = {
            UID: req.body.UID,
            password: req.body.password,
            validityAccountDate: req.body.validityAccountDate,
            accountState: req.body.accountState,
            resident_id: req.body.residentId,
            dormitory_id: req.body.dormitoryId,
        }
        let updateResidentAccount = {
           // UID: req.body.UID,
            password: req.body.password,
            validityAccountDate: req.body.validityAccountDate,
            accountState: req.body.accountState
        }

        req.newResidentAccount = newResidentAccount;
        req.updateResidentAccount = updateResidentAccount;
        next();
    },

    CreateNewResidentAccount: function(req, res){
        residentAccountTable.create(req.newResidentAccount)
        .then((newResidentAccount) => {
                res.send(newResidentAccount);
            }).catch(error => {
                res.send(error);
        })
    },

    GetAllResidentAccounts: function(req, res){
        residentAccountTable.findAll()
        .then(residentAccounts =>{
            if(residentAccounts.length == 0){
                res.send(residentAccounts)
            } else{
                res.status(200);
                res.send(residentAccounts);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetResidentAccountsById: function(req, res){
        
                let residentId = req.params.residentId;
                residentAccountTable.findAll(
                    {
                        where:{
                            resident_id:residentId
                        } 
                    }
                ).then(residentAccounts => {
                            if(residentAccounts.length == 0){
                                res.status(200);
                                res.send(residentAccounts)
                            }else{
                                res.status(200);
                                res.send(residentAccounts);
                            }
                        })
            },

    GetResidentAccountCurrentDormitoryById: function(req, res){

        let residentId = req.params.residentId;
        let dormitoryId = req.params.dormitoryId;

        residentAccountTable.findAll({
            where:{
                resident_id: residentId,
                dormitory_id: dormitoryId
            }
        }).then(residentAccount => {
                    if(residentAccount.length == 0){
                        res.status(200);
                        res.send(residentAccount)
                    }else{
                        res.status(200);
                        res.send(residentAccount);
                    }
                })
    },
    
    UpdateResidentAccountById: function(req, res){

        let residentId = req.params.residentId;
        let dormitoryId = req.params.dormitoryId;

        residentAccountTable.update(
            req.updateResidentAccount, 
            {
                where: {
                    resident_id: residentId,
                    dormitory_id: dormitoryId
                }
            }
            ).then((residentAccount) => {
                res.send(residentAccount);            
            }).catch(
                error => 
                {
                    res.status(400);
                    res.send(error);
                }
            )
    }

}

module.exports = {
    ResidentAccountController: residentAccountController
}