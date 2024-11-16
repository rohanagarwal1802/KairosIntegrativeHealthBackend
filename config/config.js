require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: process.env.DATABASE_PORT,
    dialectOptions: {
      connectTimeout: 10000, // Increase timeout to 10 seconds
    },
    pool: {
      acquire: 60000,  // Set a longer connection acquire timeout (default: 30000)
      idle: 10000,     // Set idle timeout (default: 10000)
    },
  },
};
