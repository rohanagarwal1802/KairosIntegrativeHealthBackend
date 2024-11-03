require("dotenv").config(); // Load environment variables from .env file

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: 'localhost',
    dialect: "postgres",
    port: process.env.DATABASE_PORT ,
   
  },
  
};