const citzenshipCodeTable = require('../models/models.js').DataBaseModels["citzenshipCode"];

var citzenshipController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newCitzenship = {
            citzenship: req.body.citzenship, 
            country: req.body.country,
        }
        req.newCitzenship = newCitzenship
        next();
    },

    GetAllCitzenships: function(req, res){
        citzenshipCodeTable.findAll()
        .then(citzenships =>{
            if(citzenships.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(citzenships);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetCitzenshipById: function(req, res) {
        citzenshipCodeTable.findById(req.params.id, {attributes: ['citzenship']})
        .then((citzenship) =>{
            if(citzenship == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(citzenship));
            }
        }).catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    CitzenshipController: citzenshipController
}

