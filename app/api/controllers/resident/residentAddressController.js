const sequelize = require('../../config/db.js').dbClient;
const residentAddressTable = require('../../models/models.js').DataBaseModels["addressResident"];
const typeAddressTable = require('../../models/dictionaries/type-address').TypeAddressModel;

var residentAddressController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
    
        let updateResidentAddress = {
            id: req.body.id,
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
        
        let response = {
            isCreated: false,
            newResidentAddresses: [],
            errorMessage: {}
        }

        residentAddressTable.bulkCreate(req.body)
        .then(() => {
            
            residentAddressTable.findAll({
                limit: req.body.length,
                order:[
                    ['id', 'desc']
                ]
            }).then(newResidentAddresses => {
                response.isCreated = true;
                newResidentAddresses.forEach(function(element) {
                        response.newResidentAddresses.push(element.dataValues);   
                }, this);
                res.send(response);
            })
            }).catch(error => {
                response.isCreated = false;
                response.errorMessage = error;
                res.send(response);
        })
    },

    GetResidentAddressById: function(req, res){

        let residentId = req.params.id

        sequelize.query(
            'SELECT address_residents.id, country, city, street, house_number as "houseNumber", ' + 
            'apartment_number as "apartmentNumber", post_code as "postCode", address, address_type_id, resident_id ' + 
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

        let response = {
            isUpdated: false,
            updatedResidentAddress: [],
            errorMessage: {}
        }
        residentAddressTable.update(
            req.updateResidentAddress, 
            {
                where: {
                    id: req.updateResidentAddress.id
                },
                returning: true
            }
            ).then((updatedResidentAddres) => {
                response.isUpdated = true;
                response.updatedResidentAddress.push(updatedResidentAddres[1][0].dataValues);
                res.send(response);            
            }).catch(
                error => 
                {
                    res.status(400);
                    response.isUpdated = false;
                    response.errorMessage = error;
                    res.send(response);
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