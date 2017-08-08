const stayResidentTable = require('../models/models.js').DataBaseModels["stayResident"];

var residentStayController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResidentStay = {
            dateOfArrival: req.body.dateOfArrival, 
            dateOfDeparture: req.body.dateOfDeparture,
            dateOfTempDeparture: req.body.dateOfTempDeparture,
            roomNumber: req.body.roomNumber,
            dateCrossRP: req.body.dateCrossRP,
            comments: req.body.comments
        }
        req.newResidentStay = newResidentStay
        next();
    },

    GetAllResidentsStays: function(req, res){
        stayResidentTable.findAll()
        .then(residentsStay =>{
            if(residentsStay.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(residentsStay);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetResidentStayById: function(req, res) {
        stayResidentTable.findById(req.params.id)
        .then((residentStay) =>{
            if(residentStay == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(residentStay));
            }
        }).catch(error => {
            res.send(error);
        })
    }

}

module.exports = {
    ResidentStayController: residentStayController
}

