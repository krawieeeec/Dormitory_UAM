const stayResidentTable = require('../../models/models.js').DataBaseModels["stayResident"];

var residentDormitoryController = {

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
            dateCrossRp: req.body.dateCrossRp,
            comments: req.body.comments,
            dormitory_id: req.body.dormitoryId,
            document_id: req.body.documentId,
            resident_id: req.body.residentId 
        }

        req.newResidentStay = newResidentStay; 
        next();
    },

    CreateNewResidentStay: function(req, res){
        stayResidentTable.create(req.newResidentStay)
        .then((newResidentStay) => {
                res.send(newResidentStay);
            }).catch(error => {
                res.send(error);
        })
    },

    GetResidentStayDormitoryById: function(req, res) {
        let residentId = req.params.id;

        stayResidentTable.findOne({
            where:{
                resident_id: residentId
            },
            attributes: ['dateOfArrival','dateOfDeparture', 'dateOfTempDeparture', 
            'roomNumber', 'dateCrossRp', 'comments', 'dormitory_id', 'document_id', 'resident_id']
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
    
    UpdateResidentStayDormitoryById: function(req, res){

        let residentId = req.params.id;
        stayResidentTable.update(
            req.newResidentStay, 
            {
                where: {
                    resident_id: residentId
                }
            }
            ).then(() => {
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
    ResidentDormitoryController: residentDormitoryController
}

