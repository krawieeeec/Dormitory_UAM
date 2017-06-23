var express = require('express');
var bodyParser = require('body-parser');
const residentTable = require('../models/tables/resident.js').ResidentModel;

var router = express.Router();

router.get('/resident', function (req, res) {
    residentTable.findAll({attributes: ['id', 'Name', 'Surname']}).then( (residents) => {
        if(residents.length == 0)
            res.send('There aren\'t any entries in Residents table.');
        else{
            residents.forEach(function(resident){
                res.send(JSON.stringify(resident));
            }); 
        } 
    }).catch(() =>{
        res.send(error);
    })
})

router.get('/resident/:id', function(req, res){
    residentTable.findById(req.params.id, {attributes: ['id', 'Name', 'Surname']}).then((resident) =>{
        if(resident == null)
            res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
        else
            res.send(JSON.stringify(resident));
    }).catch(error => {
        res.send(error);
    })
})

router.get('/resident/:id/delete', function(req, res){
    residentTable.destroy({where: {id: req.params.id}}).then(() =>{
        res.send('Entry was deleted with ID:' + req.params.id+ 'from Resident table.');
    }).catch(error => {
        res.send(error);
    })
})

module.exports = router;