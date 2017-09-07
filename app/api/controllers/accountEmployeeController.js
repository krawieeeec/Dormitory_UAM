const accountEmployeeTable = require('../models/models.js').DataBaseModels["accountEmployee"];

var accountEmployeeController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newAccountEmployee = {
            name: req.body.name, 
            surname: req.body.surname,
            login: req.body.login,
            password: req.body.password
        }
        req.newAccountEmployee = newAccountEmployee;
        next();
    },

    GetAllAccountEmployees: function(req, res){
        accountEmployeeTable.findAll()
        .then(accountEmployees =>{
            if(accountEmployees.length == 0){
                res.send([])
            } else{
                res.status(200);
                res.send(accountEmployees);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },
    
    GetAccountEmployeeById: function(req, res) {
        
        let accountEmployeeId = req.params.id;

        accountEmployeeTable.findAll({
            where:{
                id:accountEmployeeId
            }
        }
        )
        .then((accountEmployee) =>{
            if(accountEmployee.length == 0)
                res.send([])
            else{
                res.send(JSON.stringify(accountEmployee));
            }
        }).catch(error => {
            res.send(error);
        })
    },

    CreateAccountEmployee: function(req, res){
        
        accountEmployeeTable.create(req.newAccountEmployee)
        .then((newAccountEmployee) => {
                res.send(newAccountEmployee);
            }).catch(error => {
                res.send(error);
        })
    }
}

module.exports = {
    AccountEmployeeController: accountEmployeeController
}

