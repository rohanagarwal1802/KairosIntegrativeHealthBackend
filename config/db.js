const { Sequelize } = require("sequelize");
const config = require("./config");

// Choose the environment to test (development, test, production)
const env = "development";

// Initialize Sequelize with the selected environment configuration
const sequelize = new Sequelize(config[env]);

module.exports = sequelize;