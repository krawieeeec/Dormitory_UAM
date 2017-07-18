const dormitoryTable = require('../models/models.js').DataBaseModels["dormitory"];

var dormitoryController = {

    FormResponseObject: function(req, res, next){

        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
    },

    GetAllDormitories: function(req, res){
        dormitoryTable.findAll({attributes: ['dormitoryName', 'adress']})
            .then((dormitories) => {
                if(dormitories.length == 0){
                    res.send('There aren\'t any entries in dormitories table.')
                }
                else{
                    res.status(200);
                    res.send(JSON.stringify(dormitories));
                }
            }).catch((error) => {
                res.send(error);
            })
    }
}

module.exports = {
    DormitoryController : dormitoryController
}