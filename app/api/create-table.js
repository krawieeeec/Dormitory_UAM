const db = require('./common/db').dbClient;

const Sequelize = require('sequelize');
const sequelize = db;//= new Sequelize('postgres://postgres:dawid2790@localhost:5432');

const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT
})

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE
});

Project.drop();
Task.drop();
