const typeAddressTable = require('../models/models.js').DataBaseModels["typeAddress"];

var typeAddressController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newTypeAddress = {
            address: req.body.address
        }
        req.newTypeAddress = newTypeAddress
        next();
    },

    GetAllTypeAddress: function(req, res){
        typeAddressTable.findAll()
        .then(typeAddresses =>{
            if(typeAddresses.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(typeAddresses);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetTypeAddressById: function(req, res) {
        typeAddressTable.findById(req.params.id)
        .then((typeAddress) =>{
            if(typeAddress == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(typeAddress));
            }
        }).catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    TypeAddressController: typeAddressController
}

