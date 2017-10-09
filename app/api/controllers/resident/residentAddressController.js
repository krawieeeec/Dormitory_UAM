const sequelize = require('../../config/db.js').dbClient;
const residentAddressTable = require('../../models/models.js').DataBaseModels["addressResident"];

var residentAddressController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let updateResidentAddress = {
            country: req.body.country, 
            street: req.body.street,
            houseNumber: req.body.houseNumber,
            apartmentNumber: req.body.apartmentNumber,
            postCode: req.body.postCode,
            city: req.body.city,
            address_type_id: req.body.address_type_id
        }

        req.updateResidentAddress = updateResidentAddress;
        next();
    },

    CreateNewResidentAddress: function(req, res){
        console.log(req.body);
        residentAddressTable.bulkCreate(req.body)
        .then((residentAddressList) => {
                console.log(residentAddressList);
                res.send(residentAddressList);
            }).catch(error => {
                console.log(error);
                res.send(error);
        })
    },

    GetResidentAddressById: function(req, res){

        let residentId = req.params.id

        sequelize.query(
            'SELECT address_residents.id, country, city, street, house_number as "houseNumber", ' + 
            'apartment_number as "apartmentNumber", post_code as "postCode", address, address_type_id ' + 
            'FROM address_residents INNER JOIN type_addresses '+ 
            'ON address_residents.address_type_id = type_addresses.id ' + 
            'WHERE address_residents.resident_id = :id ORDER BY address_residents.id',
            {replacements: {id: residentId}, type: sequelize.QueryTypes.SELECT }).
                then(residentAddress => {
                    if(residentAddress.length == 0){
                        res.status(200);
                        res.send([]);
                    }else{
                        res.status(200);
                        res.send(residentAddress);
                    }
                })
    },
    
    UpdateResidentAddressById: function(req, res){

        let addressId = req.params.id;
        
        residentAddressTable.update(
            req.updateResidentAddress, 
            {
                where: {
                    id: addressId
                }
            }
            ).then(() => {
                res.send(req.updateResidentAddress);            
            }).catch(
                error => 
                {
                    res.status(400);
                    res.send(error);
                }
            )
    },
    DeleteResidentAddressById: function(req, res){
        
                let id = req.params.id;
        
                residentAddressTable.findOne({
                    where: {
                        id: id
                    }
                }).then(residentAddress =>{
                    if(residentAddress != null){
                        residentAddress.destroy()
                        .then(()=>{
                            res.send(residentAddress);
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
    ResidentAddressController: residentAddressController
}