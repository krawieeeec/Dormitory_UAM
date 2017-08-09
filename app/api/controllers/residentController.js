const sequelize = require('../config/db.js').dbClient;
const residentTable = require('../models/models.js').DataBaseModels["resident"];

var residentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResident = {
            name: req.body.name,
            surname: req.body.surname,
            genre: req.body.genre,
            birthDate: req.body.birthDate,  
            birthPlace: req.body.birthPlace,
            motherName: req.body.motherName,
            fatherName: req.body.fatherName,
            pesel: req.body.pesel,
            citzenshipCodeID: req.body.citzenshipCodeID
        }
        req.newResident = newResident
        next();
    },
    
    GetAllResidents:  function (req, res) {
        
        residentTable.findAll({attributes: ['id', 'name', 'surname']})
        .then( (residents) => {
            if(residents.length == 0)
                res.send('There aren\'t any entries in residents table.');
            else{   
                    res.status(200);
                    res.send(JSON.stringify(residents));
            } 
        }).catch((error) =>{
            res.send(error);
        })
    },

    GetResidentById:  function(req, res){
        //{attributes: ['id', 'name', 'surname']} -> Dodaj Atrybuty
        residentTable.findById(req.params.id)
        .then((resident) =>{
            if(resident == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(resident));
            }
        }).catch(error => {
            res.send(error);
        })
    },

    GetResidentPersonalDataById: function(req, res){
        let residentId = req.params.id

        sequelize.query(
            'SELECT name, surname, genre, phone_number, birth_date, birth_place, mother_name, father_name, pesel, citzenship '+ 
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
            
    GetResidentDocumentById: function(req, res) {
        let residentId = req.params.id

        sequelize.query(
            'SELECT release_date, expiration_date, issuing_country, type_document FROM documents '+ 
            'INNER JOIN type_documents ON documents.document_type_id = type_documents.id '+
            'WHERE resident_id = :id',
            {replacements: {id: residentId}, type: sequelize.QueryTypes.SELECT }).
                then(residentDocument => {
                    if(residentDocument.length == 0){
                        res.status(200);
                        res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
                    }else{
                        res.status(200);
                        res.send(residentDocument);
                    }
                })
    },
            

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
    },

    AddResident: function(req, res){

        residentTable.create(req.newResident)
        .then(() => {
                res.send('Added new entry to resident table.');
            }).catch(error => {
                res.send(error);
        })
    },

    UpdateResidentById: function(req, res){

        residentTable.findById(req.params.id)
        .then(resident =>{
            resident.update(req.newResident).then(() => {
                res.send('entry was updated');
            }).catch(
                error => 
                {
                    res.status(400);
                    res.send(error);
                }
            )
        })
    }
}

module.exports = {
    ResidentController: residentController
}