const dbClient = require('../app.js').SynchronizationTables;

//Tables
const accountResidentTable = require('../models/tables/account-resident.js').AccountResidentModel;
const addressResidentTable = require('../models/tables/address-resident.js').AddressResidentModel;
const documentTable = require('../models/tables/document.js').DocumentModel;
const residentTable = require('../models/tables/resident.js').ResidentModel;
const stayResidentTable = require('../models/tables/stay-resident.js').StayResidentModel;
//Dictionaries
const cityTable = require('../models/dictionaries/city.js').CityModel;
const citzenshipCodeTable = require('../models/dictionaries/citzenship-code.js').CitzenshipCodeModel;
const dormitoryTable = require('../models/dictionaries/dormitory.js').DormitoryModel;
const typeAddressTable = require('../models/dictionaries/type-address.js').TypeAddressModel;
const typeDocumentTable = require('../models/dictionaries/type-document.js').TypeDocumentModel;
//to table of dormitory
        residentTable.findAll({
            include:[{model: stayResidentTable, where:{dormitory_id: 4}}]
        }).then(results => {
            console.log(results[0].dataValues)

        }).catch(error => {
            console.log(error)
        })
