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
            dormitory_id: req.body.dormitory_id,
            document_id: req.body.document_id,
            resident_id: req.body.resident_id,
            temp_address_id: req.body.temp_address_id,
            regular_address_id: req.body.regular_address_id 
        }

        req.newResidentStay = newResidentStay; 
        next();
    },

    CreateNewResidentStay: function(req, res){

        let response = {
            isCreated: false,
            newResidentStay: [],
            errorMessage: {}
        }

        stayResidentTable.create(req.newResidentStay)
        .then((newResidentStay) => {
                response.isCreated = true;
                response.newResidentStay.push(newResidentStay)
                res.send(response);
            }).catch(error => {
                response.isCreated = false;
                response.errorMessage = error;
                res.send(response);
        })
    },

    GetResidentStayDormitoryById: function(req, res) {
        
        let stayResidentId = req.params.id;
        let response = {
            isSearched: false,
            stayResident: {},
            errorMessage: {}
        }

        stayResidentTable.findOne({
            where:{
                id: stayResidentId
            },
            attributes: ['id', 'dateOfArrival','dateOfDeparture', 'dateOfTempDeparture', 
            'roomNumber', 'dateCrossRp', 'comments', 'dormitory_id', 'document_id', 'resident_id',
            'temp_address_id', 'regular_address_id']
        })
        .then((stayResident) =>{
            response.isSearched = true;
            response.stayResident = stayResident;
            res.send(response); 
        }).catch(error => {
            response.isSearched = false;
            response.errorMessage = error;
            res.send(response);
        })
    },
    
    UpdateResidentStayDormitoryById: function(req, res){

        let stayResidentId = req.params.id;
        let response = {
            isUpdated: false,
            stayResident: {},
            errorMessage: {}
        }
        console.log('UPDATE');
        console.log(req.newResidentStay);
        console.log(stayResidentId)
        stayResidentTable.update(
            req.newResidentStay, 
            {
                where: {
                    id: stayResidentId
                }
            }
            ).then((stayResident) => {
                response.isUpdated = true;
                response.stayResident = stayResident;
                res.send(response);            
            }).catch(
                error => 
                {
                    response.isUpdated = false;
                    response.errorMessage = error
                    res.status(400);
                    res.send(response);
                }
            )
    }

}

module.exports = {
    ResidentDormitoryController: residentDormitoryController
}

