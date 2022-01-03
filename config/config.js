require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": 'mysql'
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_DATABASE,
    "host": process.env.DB_HOST,
    "dialect": 'mysql'
  },
  "production": {
    "username": 'user',
    "password": 'password',
    "database": 'database_production',
    "host": '127.0.0.1',
    "port": 5432,
    "dialect": 'postgres'
  }
};
