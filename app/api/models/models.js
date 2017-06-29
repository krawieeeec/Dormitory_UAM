const fs = require('fs');
const sequelize = require('sequelize');
const dbModels = require('../config/db.js').dbClient;

var dictionaries = fs.readdirSync(__dirname + '/dictionaries');
var tables = fs.readdirSync(__dirname + '/tables');

dictionaries.forEach(function(fileName){
    
    let nameImportedAssociation;
    let nameImportedModel;
    let indexOfDash;
    let upperChar;
    let createDictionary;
    let nameOfTable;
    
    createDictionary = require(__dirname + '\\dictionaries\\' + fileName);
    indexOfDash = fileName.indexOf('-');

    if(indexOfDash > -1){
        
        nameImportedModel =  fileName.replace('-', "");
        nameImportedModel =  nameImportedModel.slice(0, nameImportedModel.length - 3);
        upperChar = nameImportedModel[indexOfDash].toUpperCase();
        nameImportedModel = nameImportedModel.slice(0, indexOfDash) + upperChar + nameImportedModel.slice(indexOfDash + 1);
        upperChar = nameImportedModel[0].toUpperCase();
        nameImportedModel = upperChar + nameImportedModel.slice(1) + 'Model';
        nameImportedAssociation = nameImportedModel.slice(0, -5) + 'Associations';       
        nameOfTable = createDictionary[nameImportedModel].name;
        dbModels[nameOfTable] = createDictionary[nameImportedModel];        
         
    
} else {
        upperChar = fileName[0].toUpperCase();
        nameImportedModel = fileName.slice(0, fileName.length - 3);
        nameImportedModel = upperChar + fileName.slice(1, fileName.length - 3) + 'Model';
        nameOfTable = createDictionary[nameImportedModel].name;
        
        dbModels[nameOfTable] = createDictionary[nameImportedModel];
            
    }
    
});

tables.forEach(function(fileName){

    let nameImportedModel;
    let nameImportedAssociation;
    let indexOfDash;
    let upperChar;
    let createTable;
    let nameOfTable;

    createTable = require(__dirname + '\\tables\\' + fileName);
    indexOfDash = fileName.indexOf('-');
    if(indexOfDash > -1){

        nameImportedModel =  fileName.replace('-', "");
        nameImportedModel =  nameImportedModel.slice(0, nameImportedModel.length - 3);
        upperChar = nameImportedModel[indexOfDash].toUpperCase();
        nameImportedModel = nameImportedModel.slice(0, indexOfDash) + upperChar + nameImportedModel.slice(indexOfDash + 1);
        upperChar = nameImportedModel[0].toUpperCase();
        nameImportedModel = upperChar + nameImportedModel.slice(1) + 'Model';
        nameOfTable = createTable[nameImportedModel].name;
        dbModels[nameOfTable] = createTable[nameImportedModel];
                        
    } else {

        upperChar = fileName[0].toUpperCase();
        nameImportedModel = upperChar + fileName.slice(1, fileName.length - 3) + 'Model';
        nameOfTable = createTable[nameImportedModel].name;
        
        dbModels[nameOfTable] = createTable[nameImportedModel];
        
    }    
});

let nameModel;
let nameFunction;
let upperChar;

for(var property in dbModels.models){
    
    nameModel = property;
    property = property.replace('_', "");
    upperChar = property[0].toUpperCase(); 
    property = upperChar + property.slice(1) + 'Associations';
    nameFunction = property;
        
    if(dbModels[nameModel][nameFunction] !== undefined){
        dbModels[nameModel][nameFunction](dbModels);
    }
}

module.exports = {
    DataBaseModels: dbModels
}
