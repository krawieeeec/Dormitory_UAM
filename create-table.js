const db = require('./db.js');
const Sequelize = require('sequelize');
const sequelize = db.dbClient;//= new Sequelize('postgres://postgres:dawid2790@localhost:5432');

const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
})

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

Project.sync();
Task.sync();
