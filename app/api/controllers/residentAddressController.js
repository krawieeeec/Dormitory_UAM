const residentAddressTable = require('../models/models.js').DataBaseModels["addressResident"];

var residentAddressController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResidentAddress = {
            country: req.body.country, 
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            postCode: req.body.postCode,
            city: req.body.city
        }
        req.newResidentAddress = newResidentAddress
        next();
    },

    GetAllResidentAddress: function(req, res){
        residentAddressTable.findAll()
        .then(addresses =>{
            if(addresses.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            }
            else{
                res.status(200);
                res.send(addresses);
            }
        })
        .catch(error => {
            res.send(error);
        })
    },

    GetResidentAddressById: function(req, res){

        residentAddressTable.findById(req.params.id)
        .then(address =>{
            if(address == null){
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            }else{
                res.send(JSON.stringify(address));
            }
        })
        .catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    ResidentAddressController: residentAddressController
}