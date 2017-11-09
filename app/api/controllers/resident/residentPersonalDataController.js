const sequelize = require('../../config/db.js').dbClient;
const residentTable = require('../../models/models.js').DataBaseModels["resident"];

var residentPersonalDataController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResidentPersonalData = {
            name: req.body.name,
            surname: req.body.surname,
            genre: req.body.genre,
            birthDate: req.body.birthDate,  
            birthPlace: req.body.birthPlace,
            motherName: req.body.motherName,
            fatherName: req.body.fatherName,
            pesel: req.body.pesel,
            phoneNumber: req.body.phoneNumber,
            citzenship_code_id: req.body.citzenshipCodeId
        }
        
        req.newResidentPersonalData = newResidentPersonalData;
        
        next();
    },

    CreateNewResidentPersonalData: function(req, res){
        let response = {
            isCreated: false,
            newResident: [],
            errorMessage: {}
        }

        console.log(req.newResidentPersonalData);
        residentTable.create(req.newResidentPersonalData)
        .then((newResident) => {
                response.isCreated = true;
                response.newResident.push(newResident);
                res.send(response);
            }).catch(error => {
                res.status(404);
                response.isCreated = false;
                response.errorMessage = error
                res.send(response);
        })
    },

    GetResidentPersonalDataById: function(req, res){

        let residentId = req.params.id

        sequelize.query(
            'SELECT residents.id, name, surname, genre, phone_number, birth_date, birth_place, mother_name, father_name, pesel, citzenship, citzenship_code_id '+ 
            'FROM residents INNER JOIN citzenship_codes ON residents.citzenship_code_id = citzenship_codes.id '+ 
            'WHERE residents.id = :id',
            {replacements: {id: residentId}, type: sequelize.QueryTypes.SELECT }).
                then(residentPersonalData => {
                    if(residentPersonalData.length == 0){
                        res.status(200);
                        res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
                    }else{
                        res.status(200);
                        res.send(residentPersonalData);
                    }
                })
    },

    UpdateResidentPersonalDataById: function(req, res){

        let response = {
            isUpdated: false,
            updatedResident: [],
            errorMessage: {}
        }
            
        let residentId = req.params.id;
        residentTable.update(
            req.newResidentPersonalData, 
            {
                where: {
                    id: residentId
                },
                returning: true
            }
            ).then((updatedResident) => {
                response.isUpdated = true;
                response.updatedResident.push(updatedResident[1][0].dataValues);
                res.status(200);
                res.send(response);            
            }).catch(
                error => 
                {
                    res.status(404);
                    response.isUpdated = false;
                    response.errorMessage = error;
                    res.send(response);
                }
            )
    }
}

module.exports = {
    ResidentPersonalDataController: residentPersonalDataController
}
