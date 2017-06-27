const dbClient = require('./app.js').SynchronizationTables;

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

dbClient.drop().then(() => {
    dbClient.sync({}).then(()=>{
        console.log('All models was been created.');
        cityTable.count().then(amountData =>{
            if(amountData >= 0){
                cityTable.bulkCreate([
                    {Name_City: 'Poznań', Post_Code:'60-697', Region: 'Wielkopolska'},
                    {Name_City: 'Warszawa', Post_Code:'43-412', Region: 'Mazowsze'},
                    {Name_City: 'Bydgoszcz', Post_Code: '71-234', Region: 'Kujawsko-Pomorskie'},
                    {Name_City: 'Inowrocław', Post_Code: '88-100', Region: 'Kujawsko-Pomorskie'},
                    {Name_City: 'Olsztyn', Post_Code: '37-234', Region: 'Warminsko-Mazurskie'},
                    {Name_City: 'Szczecin', Post_Code: '58-295', Region: 'Zachodnie-Pomorskie'},
                    {Name_City: 'Zakopane', Post_Code: '29-485', Region: 'Małopolska'}
                ]).catch(() => {
                    console.log('CITY TABLE - ERROR');
                }).then(() => {
                    return cityTable.findAll();
                }).then(cities => {
                    console.log('******************************************************');
                    console.log('City Table');
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
                        {Citzenship: 'Polskie', Country: 'Polska'},
                        {Citzenship: 'Niemieckie', Country: 'Niemcy'},
                        {Citzenship: 'Włoskie', Country: 'Włochy'},
                        {Citzenship: 'Hiszpańskie', Country: 'Hiszpania'},
                        {Citzenship: 'Norweskie', Country: 'Norwegia'},
                        {Citzenship: 'Szwedzkie', Country: 'Szwecja'},
                        {Citzenship: 'Rosyjskie', Country: 'Rosja'},
                        {Citzenship: 'Łotweskie', Country: 'Łotwa'},
                        {Citzenship: 'Ukrainskie', Country: 'Ukraina'}
                    ]).catch((error) => {
                        console.log('CITZENSHIPTABLE - ERROR!');
                        console.log(error);
                    }).then(() => {
                        return citzenshipCodeTable.findAll();
                    }).then( citzenship => {
                        console.log('******************************************************');
                        console.log('Citzenship_Code Table');
                        citzenship.forEach(function(citzenship){
                            console.log(citzenship.dataValues);
                        })
                    })        
                }
            }).catch((error) => {
                console.log('Citzenship_Code Table - ERROR!');
                console.log(error);
            }).then(()=>{
                dormitoryTable.count().then(amountData => {
                    if(amountData >= 0){
                        dormitoryTable.bulkCreate([
                            {Dormitory_Name: 'Jagienka', Adress: 'Piątkowska 80', Temporary_Accommodation: ''},
                            {Dormitory_Name: 'Jowita', Adress: 'Zwierzyniecka 7', Temporary_Accommodation: ''},
                            {Dormitory_Name: 'Babilon', Adress: 'Żniwna 8', Temporary_Accommodation: ''}
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
                    typeAdressTable.count().then(amountData =>{
                        if(amountData >= 0){
                            typeAdressTable.bulkCreate([
                                {Adress: 'Stały'},
                                {Adress: 'Tymczasowy'}
                            ]).then(() => {
                                return typeAdressTable.findAll();
                            }).then(adresses =>{
                                console.log('******************************************************');
                                console.log('Type_Adress Table')
                                adresses.forEach(function(adress){
                                    console.log(adress.dataValues);
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
                                    {Type_Document: 'Dowód'},
                                    {Type_Document: 'Paszport'},
                                    {Type_Document: 'Karta Pobytu'}
                                ]).then(() => {
                                    return typeDocumentTable.findAll();
                                }).then(types =>{
                                    console.log('******************************************************');
                                    console.log('Type_Document Table')
                                    types.forEach(function(type){
                                        console.log(type.dataValues);
                                    })
                                })
                            }
                        }).catch(error =>{
                            console.log('Type_Adresses Table - Error');
                            console.log(error);
                        }).then(() => {
                            adressResidentTable.count().then(amountData => {
                                if(amountData >= 0){
                                    adressResidentTable.bulkCreate([
                                        {Country: 'Polska', Street: 'Czarlinskiego', House_Number: '9', 
                                        Apartment_Number:'6', Post_Code:'88-100', City:'Inowrocław', 
                                        Type_Adress_ID:'1'}, 
                                        {Country: 'Polska', Street: 'Wyspiańskiego', House_Number: '54', 
                                        Apartment_Number:'64', Post_Code:'60-242', City:'Poznań', 
                                        Type_Adress_ID:'2'}, 
                                        {Country: 'Polska', Street: 'Warszawska', House_Number: '12', 
                                        Apartment_Number:'84', Post_Code:'28-532', City:'Wrocław', 
                                        Type_Adress_ID:'2'}, 
                                        {Country: 'Polska', Street: 'Piłsudzkiego', House_Number: '2', 
                                        Apartment_Number:'98', Post_Code:'12-434', City:'Olsztyn', 
                                        Type_Adress_ID:'2'}
                                    ]).then(() => {
                                        return adressResidentTable.findAll();
                                    }).then(adresses => {
                                        console.log('******************************************************');
                                        console.log('Adress_Residents Table')
                                        adresses.forEach(function(adress){
                                            console.log(adress.dataValues);
                                        })
                                    })
                                }
                            }).then(() => {
                                residentTable.count().then(amountData => {
                                    if(amountData >= 0){
                                        residentTable.bulkCreate([
                                            {Name: 'Dawid', Surname: 'Krawczyk', Genre: 'male', Birth_Date:'1992-08-02', Birth_Place: 'Inowrocław', 
                                            Mother_Name:'Dorota', Father_Name: 'Darek', PESEL:'95275820583', Adress_ID:1},
                                            {Name: 'Paweł', Surname: 'Jaworski', Genre: 'male', Birth_Date:'1982-03-23', Birth_Place: 'Poznań', 
                                            Mother_Name:'Dagmara', Father_Name: 'Janusz', PESEL:'2351567433', Adress_ID:3},
                                            {Name: 'Dorota', Surname: 'Pawelczyk', Genre: 'female', Birth_Date:'1969-08-09', Birth_Place: 'Olsztyn', 
                                            Mother_Name:'Barbara', Father_Name: 'Zygmunt', PESEL:'28548332152', Adress_ID:4},
                                            {Name: 'Jakub', Surname: 'Piotrowski', Genre: 'male', Birth_Date:'1992-02-13', Birth_Place: 'Żnin', 
                                            Mother_Name:'Monika', Father_Name: 'Piotr', PESEL:'1235749247', Adress_ID:2},
                                            {Name: 'Kasia', Surname: 'Smektalska', Genre: 'female', Birth_Date:'1996-12-07', Birth_Place: 'Gdańsk', 
                                            Mother_Name:'Klaudia', Father_Name: 'Bartosz', PESEL:'3497512687', Adress_ID:1}
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
                                }).then(() =>{
                                    documentTable.count().then(amountData =>{
                                        if(amountData >=0) {
                                            documentTable.bulkCreate([
                                                {Name_Document: 'Dowód Tożsamosci', Release_Date: '2016-08-02', Expiration_Date: '2020-02-19', 
                                                Issuing_Country: 'Polska', Type_Document_ID: '1'}, 
                                                {Name_Document: 'Paszport', Release_Date: '2014-02-12', Expiration_Date: '2018-09-22', 
                                                Issuing_Country: 'Polska', Type_Document_ID: '2'}, 
                                                {Name_Document: 'Niemiecki dowód tożsamości', Release_Date:'2012-11-29', Expiration_Date: '2023-05-11', 
                                                Issuing_Country: 'Niemcy', Type_Document_ID: '1'}, 
                                                {Name_Document: 'Karta Polaka', Release_Date: '2017-06-20', Expiration_Date: '2028-03-16', 
                                                Issuing_Country: 'Ukraina', Type_Document_ID: '3'}, 
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
                                                    /*
                                                    {Date_Arrival:'', Time_Visit:'', Data_Check_Out:'', Room_Number:'', Data_Cross_RP:'', Comments:'',
                                                    Dormitory_ID:'', Time_Report_ID:'', Regular_Report_ID:'', Document_ID:'', Resident_ID: ''},
                                                    {Date_Arrival:'', Time_Visit:'', Data_Check_Out:'', Room_Number:'', Data_Cross_RP:'', Comments:'',
                                                    Dormitory_ID:'', Time_Report_ID:'', Regular_Report_ID:'', Document_ID:'', Resident_ID: ''},
                                                    {Date_Arrival:'', Time_Visit:'', Data_Check_Out:'', Room_Number:'', Data_Cross_RP:'', Comments:'',
                                                    Dormitory_ID:'', Time_Report_ID:'', Regular_Report_ID:'', Document_ID:'', Resident_ID: ''},
                                                    {Date_Arrival:'', Time_Visit:'', Data_Check_Out:'', Room_Number:'', Data_Cross_RP:'', Comments:'',
                                                    Dormitory_ID:'', Time_Report_ID:'', Regular_Report_ID:'', Document_ID:'', Resident_ID: ''}
                                                
                                                */
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
});
