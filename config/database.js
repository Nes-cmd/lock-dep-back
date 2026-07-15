require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lock_dep_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);
