const sequelize = require('../../config/db.js').dbClient;
const documentTable = require('../../models/models.js').DataBaseModels["document"];

var residentDocumentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let updateResidentDocument = {
            releaseDate: req.body.releaseDate,
            expirationDate: req.body.expirationDate,
            issuingCountry: req.body.issuingCountry,
            typeDocument: req.body.typeDocument,  
            document_type_id: req.body.documentTypeId
        }

        req.updateResidentDocument = updateResidentDocument;
        next();
    },

    CreateNewResidentDocument: function(req, res){
        
        documentTable.bulkCreate(req.body)
        .then((residentDocumentList) => {
                res.send(residentDocumentList);
            }).catch(error => {
                res.send(error);
        })
    },

    GetResidentDocumentsById: function(req, res) {
        let residentId = req.params.id

        sequelize.query(
            'SELECT documents.id, release_date, expiration_date, issuing_country, type_document, document_type_id, resident_id FROM documents '+ 
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

        let residentId = req.params.id;
        documentTable.update(
            req.updateResidentDocument, 
            {
                where: {
                    id: residentId
                }
            }
            ).then(() => {
                res.send(req.updateResidentDocument);
            }).catch(
                error => 
                {
                    res.status(400);
                    res.send(error);
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