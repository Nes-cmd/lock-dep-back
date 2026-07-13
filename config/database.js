const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '9463yobkem',  // Your MySQL password
    database: 'lock_dep_db',
    logging: false,
});

module.exports = sequelize;