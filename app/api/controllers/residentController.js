const residentTable = require('../models/tables/resident.js').ResidentModel;

var residentController = {
    
    GetAllResidents :  function (req, res) {
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

    GetResidentByID :  function(req, res){
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
        residentTable.destroy({where: {id: req.params.id}}).then(() =>{
            res.send('Entry was deleted with ID:' + req.params.id+ 'from Resident table.');
        }).catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    ResidentController: residentController
}