const sequelize = require('../../config/db.js').dbClient;
const residentTable = require('../../models/models.js').DataBaseModels["resident"];

var residentPersonalDataController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
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
            citzenship_code_id: req.body.citzenshipCodeId
        }
        req.newResidentPersonalData = newResidentPersonalData
        next();
    },

    CreateNewResidentPersonalData: function(req, res){
        residentTable.create(req.newResidentPersonalData)
        .then((newResident) => {
                res.send(newResident);
            }).catch(error => {
                res.send(error);
        })
    },

    GetResidentPersonalDataById: function(req, res){
        let residentId = req.params.id

        sequelize.query(
            'SELECT name, surname, genre, phone_number, birth_date, birth_place, mother_name, father_name, pesel, citzenship, citzenship_code_id '+ 
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

        let residentId = req.params.id;
        residentTable.update(
            req.newResidentPersonalData, 
            {
                where: {
                    id: residentId
                }
            }
            ).then(() => {
                res.status(200);
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
    ResidentPersonalDataController: residentPersonalDataController
}


/*
DeleteResidentById: function(req, res){
        
        residentTable.findById(req.params.id)
        .then((resident) => {
            if(resident == null){
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            }else{
                residentTable.destroy({where: {id: req.params.id}}).then(() =>{
                    res.send('Entry was deleted with ID:' + req.params.id+ 'from Resident table.');
                }).catch(error => {
                    res.send(error);
                })        
            }
        }).catch(error => {
            res.send(error);
        })
    }
    */