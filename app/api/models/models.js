const fs = require('fs');
const sequelize = require('sequelize');
const dbClient = require('../common/db.js').dbClient;

var dictionaries = fs.readdirSync(__dirname + '/dictionaries');
var tables = fs.readdirSync(__dirname + '/tables/');

dictionaries.forEach(function(fileName){

    let nameImportedProperties;
    let indexOfDash;
    indexOfDash = fileName.indexOf('-');
    
    if(indexOfDash > -1){

        let upperChar;
        
        nameImportedProperties =  fileName.replace('-', "");
        nameImportedProperties =  nameImportedProperties.slice(0, nameImportedProperties.length - 3);
        upperChar = nameImportedProperties[indexOfDash].toUpperCase();
        nameImportedProperties = nameImportedProperties.slice(0, indexOfDash) + upperChar + nameImportedProperties.slice(indexOfDash + 1);
        upperChar = nameImportedProperties[0].toUpperCase();
        nameImportedProperties = upperChar + nameImportedProperties.slice(1) + 'Model';
        
        console.log(nameImportedProperties);
        
        var createDictionaries = require(__dirname + '\\dictionaries\\' + fileName);  
        createDictionaries[nameImportedProperties].drop();  
    
    } else {

    }
    
    
});

