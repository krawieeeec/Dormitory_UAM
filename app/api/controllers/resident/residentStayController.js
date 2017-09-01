const residentStayTable = require('../../models/models').DataBaseModels["stayResident"];

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
            dateCrossRp: req.body.dataCrossRp,
            comments: req.body.comments
        }
        req.newResidentStay = newResidentStay
        next();
    },

    GetAllResidentStays: function(req, res){
        residentStayTable.findAll()
        .then(residentStays =>{
            if(residentStays.length == 0){
                res.send([]);
            } else{
                res.status(200);
                res.send(residentStays);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetResidentStayById: function(req, res) {
        
        let residentId = req.params.id;
        residentStayTable.findOne({
            where:{
                resident_id: residentId
            }
        })
        .then((residentStay) =>{
            if(residentStay == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(residentStay));
            }
        }).catch(error => {
            res.send(error);
        })
    },
}

module.exports = {
    ResidentStayController: residentStayController
}

