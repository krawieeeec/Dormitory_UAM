const sequelize = require('../../config/db.js').dbClient;
const documentTable = require('../../models/models.js').DataBaseModels["document"];

var residentDocumentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let updatedResidentDocument = {
            id: req.body.id,
            serialNumber: req.body.serialNumber,
            releaseDate: req.body.releaseDate,
            expirationDate: req.body.expirationDate,
            issuingCountry: req.body.issuingCountry,
            typeDocument: req.body.typeDocument,  
            document_type_id: req.body.document_type_id,
            resident_id: req.body.resident_id
        }

        req.updatedResidentDocument = updatedResidentDocument;
        next();
    },

    CreateNewResidentDocument: function(req, res){
        
        let response = {
            isCreated: false,
            newResidentDocuments: [],
            errorMessage: {}
        }
        console.log(req.body);
        documentTable.bulkCreate(req.body)
        .then(() => {
            console.log(req.body.length);
            documentTable.findAll({
                limit: req.body.length,
                order:[
                    ['id', 'desc']
                ]
            }).then(newResidentDocuments => {
                response.isCreated = true;
                newResidentDocuments.forEach(function(element) {
                    // console.log(element);
                    response.newResidentDocuments.push(element.dataValues);   
                }, this);
                res.send(response);
            })
            }).catch(error => {
                response.isCreated = false;
                response.errorMessage = error;
                res.send(response);
        })
    },

    GetResidentDocumentsById: function(req, res) {
        let residentId = req.params.id

        sequelize.query(
            'SELECT documents.id, serial_number as "serialNumber", release_date as "releaseDate", expiration_date as "expirationDate", '+
            'issuing_country as "issuingCountry", type_document as "typeDocument", document_type_id, resident_id FROM documents '+ 
            'INNER JOIN type_documents ON documents.document_type_id = type_documents.id '+
            'WHERE resident_id = :id ORDER BY documents.id',
            {replacements: {id: residentId}, type: sequelize.QueryTypes.SELECT }).
                then(residentDocuments => {
                    if(residentDocuments.length == 0){
                        res.status(200);
                        res.send([])
                    }else{
                        res.status(200);
                        res.send(residentDocuments);
                    }
                })
    },
    
    UpdateResidentDocumentById: function(req, res){

        let response = {
            isUpdated: false,
            updatedResidentDocument: [],
            errorMessage: {}
        }
        console.log(req.updatedResidentDocument);
        documentTable.update(
            req.updatedResidentDocument, 
            {
                where: {
                    id: req.updatedResidentDocument.id
                },
                returning: true
            }
            ).then((updatedResidentDocument) => {
                response.isUpdated = true;
                response.updatedResidentDocument.push(updatedResidentDocument[1][0].dataValues);
                res.send(response);            
            }).catch(
                error => 
                {
                    res.status(400);
                    response.isUpdated = false;
                    response.errorMessage = error;
                    res.send(response);
                }
            )
    },
    DeleteResidentDocumentById: function(req, res){
        
                let id = req.params.id;
        
                documentTable.findOne({
                    where: {
                        id: id
                    }
                }).then(residentDocument =>{
                    if(residentDocument != null){
                        residentDocument.destroy()
                        .then(()=>{
                            res.send(residentDocument);
                        }).catch((error)=>{
                           res.send(error);
                        })
                    }else{
                        res.sendStatus(404);
                    }
                })
            }
    
}

module.exports = {
    ResidentDocumentController: residentDocumentController
}