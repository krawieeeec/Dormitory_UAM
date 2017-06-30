const residentTable = require('../models/models.js').DataBaseModels["resident"];

var residentController = {

    FormResponseObject: function(req, res, next){
        let newResident = {
            name: req.body.name,
            surname: req.body.surname,
            genre: req.body.genre,
            birthDate: req.body.birthDate,  
            birthPlace: req.body.birthPlace,
            motherName: req.body.motherName,
            fatherName: req.body.fatherName,
            pesel: req.body.pesel,
            citzenshipCodeID: req.body.citzenshipCodeID,
            adressID: req.body.adressID
        }
    req.newResident = newResident
    next();
    },
    
    GetAllResidents:  function (req, res) {
        residentTable.findAll({attributes: ['id', 'name', 'surname']}).then( (residents) => {
            if(residents.length == 0)
                res.send('There aren\'t any entries in Residents table.');
            else{
                    res.send(JSON.stringify(residents));     
            } 
        }).catch((error) =>{
            res.send(error);
        })
    },

    GetResidentByID:  function(req, res){
        
        residentTable.findById(req.params.id, {attributes: ['id', 'name', 'surname']}).then((resident) =>{
            if(resident == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else
                res.send(JSON.stringify(resident));
        }).catch(error => {
            res.send(error);
        })
    },

    DeleteResidentByID: function(req, res){
        
        residentTable.findById(req.params.id).then((resident) => {
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
        
        residentTable.create(req.newResident).then(() => {
                res.send('Added new entry to resident table.');
            }).catch(error => {
                res.send(error);
        })
    },

    UpdateResidentByID: function(req, res){

        residentTable.findById(req.params.id).then(resident =>{
            resident.update(req.newResident).then(() => {
                res.send('entry was updated');
            })
        })
    }
}

module.exports = {
    ResidentController: residentController
}