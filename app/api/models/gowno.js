const sequelize = require('sequelize');
const connectionDataBase = new sequelize('postgres', 'postgres', 'dawid2790', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },

});

const city = connectionDataBase.define('City', {
    Name_City: { type: sequelize.STRING(30), allowNull: false, unique: true},
    Post_Code: { type: sequelize.STRING(10), allowNull: false},
    Region: { type: sequelize.STRING(20), allowNull: false}
})

const citzenshipCode = connectionDataBase.define('Citzenship_Code', {
    Citzenship: { type: sequelize.STRING(30), allowNull: false, unique: true },
    Country: { type: sequelize.STRING(30), allowNull: false, unique: true }
})

const dormitory = connectionDataBase.define('Dormitory', {
    Adress: { type: sequelize.STRING, allowNull: false, unique: true }
})

const typeAdress = connectionDataBase.define('Type_Adress', {
    Adress: {
        type: sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const typeDocument = connectionDataBase.define('Type_Document', {
    Type_Document: { type: sequelize.STRING(30), allowNull: false, unique: true }
})

const accountResident = connectionDataBase.define('Account_Resident', {
    Password: { type: sequelize.STRING(20), allowNull: false}
})

const adressResident = connectionDataBase.define('Adress_Resident', {
    Country: { type: sequelize.STRING(15), allowNull: false},
    Street: { type: sequelize.STRING(40), allowNull: false},
    House_Number: { type: sequelize.INTEGER, allowNull: false},
    Apartment_Number: { type: sequelize.INTEGER, allowNull: false},
    Post_Code: { type: sequelize.STRING(10), allowNull: false},
    City: { type: sequelize.STRING(30), allowNull: false}
}) 

const document = connectionDataBase.define('Document', {
    Name_Document: { type: sequelize.STRING, allowNull: false, unique:true },
    Release_Date: { type: sequelize.DATEONLY, allowNull: false },
    Expiration_Date: { type: sequelize.DATEONLY, allowNull: false },
    Issuing_Country: { type: sequelize.STRING(30), allowNull: false }
})


const resident = connectionDataBase.define('Resident', {
    Name: { type: sequelize.STRING(30), allowNull: false, unique: false, 
        validate: {
            isEmail: true, isInt: true
    }},
    Surname: {type: sequelize.STRING(30), allowNull: false, unique: false},
    Genre: {type: sequelize.ENUM('male', 'female'), allowNull: false, unique: false},
    Date_Birth: {type: sequelize.DATEONLY, allowNull:false, unique: false},
    Place_Brith: {type: sequelize.STRING(30), allowNull:false, unique: false},
    Mother_Name: {type: sequelize.STRING(30), allowNull: true},
    Father_Name: { type: sequelize.STRING(30), allowNull: true},
    PESEL: {type: sequelize.INTEGER, allowNull: false }
})

const stayResident = connectionDataBase.define('Stay_Resident', {
    Date_Arrival: { type: sequelize.DATEONLY, allowNull: false},
    Time_Visit: { type: sequelize.DATEONLY, allowNull: false},
    Data_Check_Out: { type: sequelize.DATEONLY, allowNull: false},
    Room_Number: { type: sequelize.INTEGER, allowNull: false},
    Date_Cross_RP: { type: sequelize.DATEONLY, allowNull: true},
    Comments: { type: sequelize.STRING, allowNull: true}
})


citzenshipCode.hasMany(resident, {foreignKey: 'Citzenship_Code_ID'});
typeAdress.hasMany(adressResident, {foreignKey: 'Type_Adress_ID', as: 'TypeAdress'});
typeDocument.hasMany(document, {foreignKey:'Type_Document_ID'});
accountResident.hasMany(dormitory, {foreignKey: 'Dormitory_ID'});
accountResident.hasOne(resident);
adressResident.hasMany(stayResident, {foreignKey: 'Time_Report_ID'});
adressResident.hasMany(stayResident, {foreignKey: 'Regular_Report_ID'});
adressResident.hasMany(resident, {foreignKey: 'Adress_ID', as:'AdressResident'});
resident.hasMany(document, {foreignKey:'Resident_ID'});
resident.hasMany(stayResident, {foreignKey:'Resident_ID'});

connectionDataBase.sync({force: true});

