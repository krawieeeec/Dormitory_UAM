const sequelize = require('../../config/db.js').dbClient;
const residentTable = require('../../models/models.js').DataBaseModels["resident"];
const stayResidentTable = require('../../models/models.js').DataBaseModels["stayResident"];
const documentTable = require('../../models/models.js').DataBaseModels["document"];

var residentSearchController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let isResidentExist = {
            pesel: req.body.pesel,
            serialNumber: req.body.serialNumber,
            citzenship: req.body.citzenship
        }

        let residentSearchedAttributes = {
            name: req.body.name,
            surname: req.body.surname,
            pesel: req.body.pesel,
            dormitoryId: req.body.dormitoryId
        }
        
        req.residentSearchedAttributes = residentSearchedAttributes;
        req.isResidentExist = isResidentExist;
        next();
    },

    
    FindResident: function(req, res){

      let emptyString = 0, nameLength = 0, surnameLength = 0, peselLength = 0, dormitoryId = 0;
      let searchedAttributes = {
          order: [
            ['pesel', 'ASC']
          ],
          where: {

          }
      }        
        /*

        let searchedAttributes = {
            order:[[stayResidentTable, 'updated_at', 'DESC']],
            where: {
            },
            include: [{
                model: stayResidentTable,
                where:{
                    dormitory_id: 0
                }
            }
            ]
        }
*/
        nameLength = req.residentSearchedAttributes.name.length;
        surnameLength = req.residentSearchedAttributes.surname.length;
        peselLength = req.residentSearchedAttributes.pesel.length;
        dormitoryId = req.residentSearchedAttributes.dormitoryId;
   
        if(nameLength > emptyString){
            searchedAttributes.where.name = {};
            searchedAttributes.where.name.$ilike = req.residentSearchedAttributes.name + '%';
        } 
        if(surnameLength > emptyString){
            searchedAttributes.where.surname = {};
            searchedAttributes.where.surname.$ilike = req.residentSearchedAttributes.surname + '%';
        } 
        if(peselLength > emptyString){
            searchedAttributes.where.pesel = {};
            searchedAttributes.where.pesel.$like = req.residentSearchedAttributes.pesel + '%';      
        }

        if((nameLength > 0) || (surnameLength > 0) || (peselLength > 0)){
            
            residentTable.findAll(searchedAttributes)
            .then(searchedResidents =>{
                res.status(200);
                res.send(searchedResidents);
                
            }).catch((error)=>{
                res.send(error);
            })
        }else{
            res.status(200);
            res.send([]);
        }
    },
    
    FindExistingResident: function(req, res){

        let response = {
            isExist: "" 
        }
        let searchedAttributes = {
            where: {

            }
        }

        let lengthSerialNumber = req.isResidentExist.serialNumber.length;
        let lengthPesel = req.isResidentExist.pesel.length;
        
        if(((req.isResidentExist.citzenship == '') || (req.isResidentExist.citzenship == 'Polskie'))
            && (lengthPesel == 11)){
                
                searchedAttributes.where.pesel = req.isResidentExist.pesel;
                
                residentTable.findOne(searchedAttributes)
                .then(existingResident =>{
                    if(existingResident != null){
                        response.isExist = true;
                        res.status(200);
                        res.send(response);
                    }else{
                        response.isExist = false;
                        res.status(200);
                        res.send(response);
                    }
                
                }).catch(error =>{
                    res.send(error);
                })
        }else if (lengthSerialNumber > 0){

            searchedAttributes.where.serialNumber = req.isResidentExist.serialNumber;
            
            documentTable.findOne(searchedAttributes)
            .then(existingResident =>{
                if(existingResident != null){
                    response.isExist = true;
                    res.status(200);
                    res.send(response);
                }else{
                    response.isExist = false;
                    res.status(200);
                    res.send(response);
                }
                
            }).catch(error =>{
                    res.send(error);
            })
        }else{
            response.isExist = false;
            res.status(200);
            res.send(response);
        }
    }
}


module.exports = {
    ResidentSearchController: residentSearchController
}