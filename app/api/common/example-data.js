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
                                        {Country: 'Dawid', Street: 'Krawczyk', House_Number: '54', 
                                        Apartment_Number:'64', Post_Code:'60=687', City:'Poznań'}
                                        
                                    ])
                                }
                            })
                        }).then(() => {
                            residentTable.count().then(amountData => {
                                if(amountData >= 0){
                                    residentTable.bulkCreate([
                                        {Name: 'Dawid', Surname: 'Krawczyk', Genre: 'male', Birth_Date:'1992-08-02', Birth_Place: 'Inowrocław', 
                                        Mother_Name:'Dorota', Father_Name: 'Darek', PESEL:'95275820583', Adress_ID:1}
                                     //  {Name: 'Paweł', Surname: 'Jaworski', Genre: 'male', Birth_Date:'1982-03-23', Birth_Place: 'Poznań', 
                                       // Mother_Name:'Dagmara', Father_Name: 'Janusz', PESEL:'2351567433', Adress_ID:2}
                                        /*{Name: '', Surname: '', Genre: '', Birth_Date:'', Birth_Place: '', 
                                        Mother_Name:'', Father_Name: '', PESEL:''}
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
});
