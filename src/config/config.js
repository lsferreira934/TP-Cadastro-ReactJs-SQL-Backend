require('dotenv').config();

module.exports = {
  development: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      dialect: 'mysql',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
  production: {
    database: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      name: process.env.DB_NAME,
      dialect: 'mysql',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    },
  },
};
