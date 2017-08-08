const documentTable = require('../models/models.js').DataBaseModels["document"];

var documentController = {

    FormResponseObject: function(req, res, next){
        
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        //res.setHeader('Access-Control-Allow-Credentials', true);
        
        let newDocument = {
            releaseDate: req.body.releaseDate, 
            expirationDate: req.body.expirationDate,
            issuingCountry: req.body.issuingCountry
        }
        req.newDocument = newDocument
        next();
    },

    GetAllResidentDocuments: function(req, res){
        documentTable.findAll()
        .then(documents =>{
            if(documents.length == 0){
                res.send('There aren\'t any entries in adress_resident table.')
            } else{
                res.status(200);
                res.send(documents);
            }
        })
        .catch(error =>{
            res.send(error);
        })
    },

    GetResidentDocumentById: function(req, res) {
        documentTable.findById(req.params.id)
        .then((docuemnt) =>{
            if(docuemnt == null)
                res.send('Under current ID:'+ req.params.id +' there isn\'t any entries in table.')
            else{
                res.send(JSON.stringify(docuemnt));
            }
        }).catch(error => {
            res.send(error);
        })
    }
}

module.exports = {
    DocumentController: documentController
}

