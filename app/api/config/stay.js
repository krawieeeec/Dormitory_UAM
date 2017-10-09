const stayResidentTable = require('../models/tables/stay-resident.js').StayResidentModel;
const dbClient = require('../app.js').SynchronizationTables;
const residentTable = require('../models/tables/resident.js').ResidentModel;

stayResidentTable.create( {dateOfArrival:'2017-05-01', dateOfDeparture:'2011-08-22', dateOfTempDeparture: '2017-08-20', 
roomNumber:'11', dataCrossRp:'2011-03-03', comments:'Brak zastrzeżeń', 
dormitory_id:'3', address_type_id:'2', regular_address_id:'1', document_id:'3', resident_id: '1'})

residentTable.create({name: 'Dawid', surname: 'Krawczyk', genre: 'Mężczyzna', phoneNumber: '506238823', birthDate:'1992-08-02', birthPlace: 'Inowrocław', 
motherName:'Dorota', fatherName: 'Darek',pesel:'95275820583', citzenship_code_id: 2, adress_id:1})

residentTable.create({name: 'Dawid', surname: 'Krawczyk', genre: 'Mężczyzna', phoneNumber: '506238823', birthDate:'1992-08-02', birthPlace: 'Inowrocław', 
motherName:'Dorota', fatherName: 'Darek',pesel:'952758583', citzenship_code_id: 3, adress_id:2})

residentTable.create({name: 'Dawid', surname: 'Krawczyk', genre: 'Mężczyzna', phoneNumber: '506238823', birthDate:'1992-08-02', birthPlace: 'Inowrocław', 
motherName:'Dorota', fatherName: 'Darek',pesel:'9758583', citzenship_code_id: 1, adress_id:1})

residentTable.create({name: 'Dawid', surname: 'Krawczyk', genre: 'Mężczyzna', phoneNumber: '506238823', birthDate:'1992-08-02', birthPlace: 'Inowrocław', 
motherName:'Dorota', fatherName: 'Darek',pesel:'97585', citzenship_code_id: 1, adress_id:1})
