const dbClient = require('../app.js').SynchronizationTables;

//Tables
const accountResidentTable = require('../models/tables/account-resident.js').AccountResidentModel;
const adressResidentTable = require('../models/tables/adress-resident.js').AdressResidentModel;
const documentTable = require('../models/tables/document.js').DocumentModel;
const residentTable = require('../models/tables/resident.js').ResidentModel;
const stayResidentTable = require('../models/tables/stay-resident.js').StayResidentModel;
//Dictionaries
const cityTable = require('../models/dictionaries/city.js').CityModel;
const citzenshipCodeTable = require('../models/dictionaries/citzenship-code.js').CitzenshipCodeModel;
const dormitoryTable = require('../models/dictionaries/dormitory.js').DormitoryModel;
const typeAdressTable = require('../models/dictionaries/type-adress.js').TypeAdressModel;
const typeDocumentTable = require('../models/dictionaries/type-document.js').TypeDocumentModel;
//to table of dormitory
        residentTable.findAll({
            include:[{model: stayResidentTable, where:{dormitory_id: 4}}]
        }).then(results => {
            console.log(results[0].dataValues)
            console.log('CHUUUUUUUJ');
        }).catch(error => {
            console.log(error)
        })
