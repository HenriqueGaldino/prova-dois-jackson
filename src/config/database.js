const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('provajackson', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
