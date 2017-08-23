const typeDocumentTable = require('../models/models.js').DataBaseModels["typeDocument"];

var typeDocumentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newTypeDocument = {
            type_document: req.body.typeDocument
        }
        req.newTypeDocument = newTypeDocument
        next();
    },

    GetAllTypeDocuments: function(req, res){
        typeDocumentTable.findAll()
        .then(typeDocuments =>{
            if(typeDocuments.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(typeDocuments);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetTyoeDocumentById: function(req, res) {
        typeDocumentTable.findById(req.params.id)
        .then((typeDocument) =>{
            if(typeDocument == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(typeDocument));
            }
        }).catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    TypeDocumentController: typeDocumentController
}

