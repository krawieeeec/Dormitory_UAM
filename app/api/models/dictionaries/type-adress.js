const Sequelize = require('sequelize');
const dbClient = require('../../common/db.js').dbClient;

const TypeAdress = dbClient.define('Type_Adress', {
    Adress: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
})

const typeAdress = TypeAdress.build({Adress: 'os.Stefana Batorego 54/64'});

module.exports = {
    TypeAdressModel: TypeAdress
}

/*
this line create table in database
TypeAdress.sync();
//This scratch of code save data to database.
typeAdress.save().then(() => {
    console.log('Added Adress');
})
this line fetch data by ID
TypeAdress.findById(1).then(adress => {
    console.log(JSON.stringify(adress));
})
*/