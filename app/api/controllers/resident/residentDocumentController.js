const sequelize = require('../../config/db.js').dbClient;
const documentTable = require('../../models/models.js').DataBaseModels["document"];

var residentDocumentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newResidentDocument = {
            releaseDate: req.body.releaseDate,
            expirationDate: req.body.expirationDate,
            issuingCountry: req.body.issuingCountry,
            typeDocument: req.body.typeDocument,  
            document_type_id: req.body.documentTypeId,
            resident_id: req.body.residentId
        }

        let updateResidentDocument = {
            releaseDate: req.body.releaseDate,
            expirationDate: req.body.expirationDate,
            issuingCountry: req.body.issuingCountry,
            typeDocument: req.body.typeDocument,  
            document_type_id: req.body.documentTypeId
        }

        req.newResidentDocument = newResidentDocument;
        req.updateResidentDocument = updateResidentDocument;
        next();
    },

    CreateNewResidentDocument: function(req, res){
        documentTable.create(req.newResidentDocument)
        .then((newResidentDocument) => {
                res.send(newResidentDocument);
            }).catch(error => {
                res.send(error);
        })
    },

    GetResidentDocumentsById: function(req, res) {
        let residentId = req.params.id

        sequelize.query(
            'SELECT release_date, expiration_date, issuing_country, type_document, document_type_id, resident_id FROM documents '+ 
            'INNER JOIN type_documents ON documents.document_type_id = type_documents.id '+
            'WHERE resident_id = :id',
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
    ResidentDocumentController: residentDocumentController
}