const typeAddressTable = require('../models/dictionaries/type-address').TypeAddressModel;
const dbClient = require('../app.js').SynchronizationTables;
const residentAddressTable = require('../models/tables/address-resident').AddressResidentModel;

residentAddressTable.findAll({
    
        include: [{
            model: typeAddressTable
        }   
        ]   
})
