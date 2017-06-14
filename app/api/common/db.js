const Sequelize = require('sequelize');
const connectionDataBase = new Sequelize('postgres', 'postgres', 'dawid2790', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

connectionDataBase
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports ={
  dbClient: connectionDataBase 
}
