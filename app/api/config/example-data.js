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

dbClient.drop().then(() => {
    dbClient.sync({force: true}).then(()=>{
        console.log('All models was been created.');
        cityTable.count().then(amountData =>{
            if(amountData >= 0){
                cityTable.bulkCreate([
                    {name: 'Poznań', postCode:'60-697', region: 'Wielkopolska'},
                    {name: 'Warszawa', postCode:'43-412', region: 'Mazowsze'},
                    {name: 'Bydgoszcz', postCode: '71-234', region: 'Kujawsko-Pomorskie'},
                    {name: 'Inowrocław', postCode: '88-100', region: 'Kujawsko-Pomorskie'},
                    {name: 'Olsztyn', postCode: '37-234', region: 'Warminsko-Mazurskie'},
                    {name: 'Szczecin', postCode: '58-295', region: 'Zachodnie-Pomorskie'},
                    {name: 'Zakopane', postCode: '29-485', region: 'Małopolska'}
                ]).catch(() => {
                    console.log('CITY TABLE - ERROR');
                }).then(() => {
                    return cityTable.findAll();
                }).then(cities => {
                    console.log('******************************************************');
                    console.log('city Table');
                    cities.forEach(function(city){
                        console.log(city.dataValues);
                    })
                });
            }
        }).catch((error) => {
            console.log('Cities Table - ERROR!');
            console.log(error);
        }).then(()=>{
            citzenshipCodeTable.count().then(amountData => {
                if(amountData >= 0){
                    citzenshipCodeTable.bulkCreate([
                        {citzenship: 'Polskie', country: 'Polska'},
                        {citzenship: 'Niemieckie', country: 'Niemcy'},
                        {citzenship: 'Włoskie', country: 'Włochy'},
                        {citzenship: 'Hiszpańskie', country: 'Hiszpania'},
                        {citzenship: 'Norweskie', country: 'Norwegia'},
                        {citzenship: 'Szwedzkie', country: 'Szwecja'},
                        {citzenship: 'Rosyjskie', country: 'Rosja'},
                        {citzenship: 'Łotweskie', country: 'Łotwa'},
                        {citzenship: 'Ukrainskie', country: 'Ukraina'}
                    ]).catch((error) => {
                        console.log('CITZENSHIPTABLE - ERROR!');
                        console.log(error);
                    }).then(() => {
                        return citzenshipCodeTable.findAll();
                    }).then( citzenship => {
                        console.log('******************************************************');
                        console.log('citzenship_Code Table');
                        citzenship.forEach(function(citzenship){
                            console.log(citzenship.dataValues);
                        })
                    })        
                }
            }).catch((error) => {
                console.log('citzenship_Code Table - ERROR!');
                console.log(error);
            }).then(()=>{
                dormitoryTable.count().then(amountData => {
                    if(amountData >= 0){
                        dormitoryTable.bulkCreate([
                            {name: 'Jagienka', address: 'Piątkowska 80'},
                            {name: 'Jowita', address: 'Zwierzyniecka 7'},
                            {name: 'Babilon', address: 'Żniwna 8'}
                        ]).then(() => {
                            return dormitoryTable.findAll();
                        }).then(dormitories => {
                            console.log('******************************************************');
                            console.log('Dormitory Table');
                            dormitories.forEach(function(dormitory){
                                console.log(dormitory.dataValues);
                            })
                        })
                    }
                }).catch((error) => {
                    console.log('Dormitory Table - ERROR!');
                    console.log(error);
                }).then(() => {
                    typeAddressTable.count().then(amountData =>{
                        if(amountData >= 0){
                            typeAddressTable.bulkCreate([
                                {address: 'Stały'},
                                {address: 'Tymczasowy'}
                            ]).then(() => {
                                return typeAddressTable.findAll();
                            }).then(addresses =>{
                                console.log('******************************************************');
                                console.log('Type_Adress Table')
                                addresses.forEach(function(address){
                                    console.log(address.dataValues);
                                })
                            })
                        }
                    }).catch(error =>{
                        console.log('Type_Adresses Table - Error');
                        console.log(error);
                    }).then(()=>{
                        typeDocumentTable.count().then(amountData =>{
                            if(amountData >= 0){
                                typeDocumentTable.bulkCreate([
                                    {typeDocument: 'Dowód'},
                                    {typeDocument: 'Paszport'},
                                    {typeDocument: 'Karta Pobytu'}
                                ]).then(() => {
                                    return typeDocumentTable.findAll();
                                }).then(types =>{
                                    console.log('******************************************************');
                                    console.log('typeDocument Table')
                                    types.forEach(function(type){
                                        console.log(type.dataValues);
                                    })
                                })
                            }
                        }).catch(error =>{
                            console.log('Type_Adresses Table - Error');
                            console.log(error);
                        }).then(() => {
                            residentTable.count().then(amountData => {
                                if(amountData >= 0){
                                    residentTable.bulkCreate([
                                        {name: 'Dawid', surname: 'Krawczyk', genre: 'male', phoneNumber: '506238823', birthDate:'1992-08-02', birthPlace: 'Inowrocław', 
                                        motherName:'Dorota', fatherName: 'Darek', pesel:'95275820583', citzenship_code_id: 2, adress_id:1},
                                        {name: 'Paweł', surname: 'Jaworski', genre: 'male', phoneNumber: '556284369', birthDate:'1982-03-23', birthPlace: 'Poznań', 
                                        motherName:'Dagmara', fatherName: 'Janusz', pesel:'2351567433', citzenship_code_id: 1, adress_id:3},
                                        {name: 'Dorota', surname: 'Pawelczyk', genre: 'female', phoneNumber: '628698423', birthDate:'1969-08-09', birthPlace: 'Olsztyn', 
                                        motherName:'Barbara', fatherName: 'Zygmunt', pesel:'28548332152', citzenship_code_id: 3, adress_id:4},
                                        {name: 'Jakub', surname: 'Piotrowski', genre: 'male', phoneNumber: '628874214', birthDate:'1992-02-13', birthPlace: 'Żnin', 
                                        motherName:'Monika', fatherName: 'Piotr', pesel:'1235749247', citzenship_code_id: 4, adress_id:2},
                                        {name: 'Kasia', surname: 'Smektalska', genre: 'female', phoneNumber: '511236987',birthDate:'1996-12-07', birthPlace: 'Gdańsk', 
                                        motherName:'Klaudia', fatherName: 'Bartosz', pesel:'3497512687', citzenship_code_id: 5, adress_id:1}
                                    ]).then(() => {
                                        return residentTable.findAll();
                                    }).then(residents => {
                                        console.log('******************************************************');
                                        console.log('Residents Table');
                                        residents.forEach(function(resident) {
                                            console.log(resident.dataValues);
                                        })
                                    })
                                }
                            }).then(() => {
                                addressResidentTable.count().then(amountData => {
                                    if(amountData >= 0){
                                        addressResidentTable.bulkCreate([
                                            {country: 'Polska', street: 'Czarlinskiego', houseNumber: '9', 
                                            apartmentNumber:'6', postCode:'88-100', city:'Inowrocław', 
                                            address_type_id:'1', resident_id: 1}, 
                                            {country: 'Polska', street: 'Wyspiańskiego', houseNumber: '54', 
                                            apartmentNumber:'64', postCode:'60-242', city:'Poznań', 
                                            address_type_id:'2', resident_id: 2}, 
                                            {country: 'Polska', street: 'Warszawska', houseNumber: '12', 
                                            apartmentNumber:'84', postCode:'28-532', city:'Wrocław', 
                                            address_type_id:'2', resident_id: 3}, 
                                            {country: 'Polska', street: 'Piłsudzkiego', houseNumber: '2', 
                                            apartmentNumber:'98', postCode:'12-434', city:'Olsztyn', 
                                            address_type_id:'2', resident_id: 4},
                                            {country: 'Polska', street: 'Krzywoustego', houseNumber: '3', 
                                            apartmentNumber:'11', postCode:'20-334', city:'Zakopane', 
                                            address_type_id:'1', resident_id: 5}
                                        ]).then(() => {
                                            return addressResidentTable.findAll();
                                        }).then(adresses => {
                                            console.log('******************************************************');
                                            console.log('Adress_Residents Table')
                                            adresses.forEach(function(adress){
                                                console.log(adress.dataValues);
                                            })
                                        })
                                    }
                                }).then(() =>{
                                    documentTable.count().then(amountData =>{
                                        if(amountData >=0) {
                                            documentTable.bulkCreate([
                                                {releaseDate: '2016-08-02', expirationDate: '2020-02-19', 
                                                issuingCountry: 'Polska', document_type_id: '1', resident_id:'1'}, 
                                                {releaseDate: '2014-02-12', expirationDate: '2018-09-22', 
                                                issuingCountry: 'Polska', document_type_id: '2', resident_id:'3'}, 
                                                {releaseDate:'2012-11-29', expirationDate: '2023-05-11', 
                                                issuingCountry: 'Niemcy', document_type_id: '1', resident_id:'4'}, 
                                                {releaseDate: '2017-06-20', expirationDate: '2028-03-16', 
                                                issuingCountry: 'Ukraina', document_type_id: '3', resident_id:'2'}, 
                                                {releaseDate: '2015-01-23', expirationDate: '2022-06-16', 
                                                issuingCountry: 'Polska', document_type_id: '2', resident_id:'5'}, 
                                            ]).then(() => {
                                                return documentTable.findAll();
                                            }).then(documents =>{
                                                console.log('******************************************************');
                                                console.log('Documents Table');
                                                documents.forEach(function(document){
                                                    console.log(document.dataValues);
                                                })
                                            })
                                        }
                                    }).then(() => {
                                        stayResidentTable.count().then(amountData => {
                                            if(amountData >=0){
                                                stayResidentTable.bulkCreate([

                                                    {dateOfArrival:'2016-05-12', dateOfDeparture: '2016-08-12', dateOfTempDeparture: '2016-09-23', 
                                                     roomNumber:'142', dataCrossRp:'', comments:'Brak zastrzeżeń', 
                                                     dormitory_id:'1', address_type_id:'1', regular_adress_id:'2', document_id:'1', resident_id: '2'},
                                                    {dateOfArrival:'2014-12-11', dateOfDeparture:'2014-02-19', dateOfTempDeparture: '2016-03-20', 
                                                     roomNumber:'9', dataCrossRp:'', comments:'Nie potrafi sprzątać po sobie', 
                                                     dormitory_id:'3', address_type_id:'3', regular_adress_id:'1', document_id:'3', resident_id: '5'},
                                                    {dateOfArrival:'2014-05-01', dateOfDeparture:'2014-08-22', dateOfTempDeparture: '2014-08-20', 
                                                     roomNumber:'1', dataCrossRp:'2011-03-03', comments:'Brak zastrzeżeń', 
                                                    dormitory_id:'3', address_type_id:'2', regular_adress_id:'1', document_id:'3', resident_id: '4'},
                                                    {dateOfArrival:'2010-04-09', dateOfDeparture:'2010-09-20', dateOfTempDeparture: '2010-08-12', 
                                                     roomNumber:'42', dataCrossRp:'2010-05-04', comments:'Zdemolowany pokój', 
                                                    dormitory_id:'2', address_type_id:'4', regular_adress_id:'1', document_id:'2', resident_id: '3'},
                                                     {dateOfArrival:'2017-05-01', dateOfDeparture:'2011-08-22', dateOfTempDeparture: '2017-08-20', 
                                                     roomNumber:'11', dataCrossRp:'2011-03-03', comments:'Brak zastrzeżeń', 
                                                    dormitory_id:'3', address_type_id:'2', regular_adress_id:'1', document_id:'3', resident_id: '1'}
                                                     
                                                ])
                                            }
                                        })
                                    })
                                })    
                            }) 
                        })   
                    })
                })
            })
        })
    })
})
