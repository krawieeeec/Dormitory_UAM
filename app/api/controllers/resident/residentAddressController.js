const sequelize = require('../../config/db.js').dbClient;
const residentAddressTable = require('../../models/models.js').DataBaseModels["addressResident"];

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

    GetResidentAddressById: function(req, res){

        let residentId = req.params.id

        sequelize.query(
            'SELECT country, city, street, house_number, apartment_number, post_code, address, address_type_id ' + 
            'FROM address_residents INNER JOIN type_addresses '+ 
            'ON address_residents.address_type_id = type_addresses.id ' + 
            'WHERE address_residents.resident_id = :id',
            {replacements: {id: residentId}, type: sequelize.QueryTypes.SELECT }).
                then(residentAddress => {
                    if(residentAddress.length == 0){
                        res.status(200);
                        res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
                    }else{
                        res.status(200);
                        res.send(residentAddress);
                    }
                })
    },
    
    UpdateResidentAddressById: function(req, res){

        let residentId = req.params.id;
        
        residentAddressTable.update(
            req.newResidentAddress, 
            {
                where: {
                    resident_id: residentId
                }
            }
            ).then(() => {
                res.send('entry was updated');            
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
    ResidentAddressController: residentAddressController
}