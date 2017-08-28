const cityTable = require('../models/models.js').DataBaseModels["city"];

var cityController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newCity = {
            name: req.body.name, 
            post_code: req.body.postCode,
            region: req.body.region
        }
        req.newCity = newCity
        next();
    },

    GetAllCities: function(req, res){
        cityTable.findAll()
        .then(cities =>{
            if(cities.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(cities);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetCityById: function(req, res) {
        cityTable.findById(req.params.id)
        .then((city) =>{
            if(city == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(city));
            }
        }).catch(error => {
            res.send(error);
        })
    },
}

module.exports = {
    CityController: cityController
}

