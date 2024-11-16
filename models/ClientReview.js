'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const ClientReview = sequelize.define("ClientReview", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  publishing_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  review: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false, // To ensure it's always set
    defaultValue: DataTypes.NOW, // Automatically sets current time when a new record is created
  },
}, {
  tableName: 'ClientReview', // Ensure the table name matches the database
  createdAt: 'created_at', // Custom column name for createdAt
  updatedAt: false, // Disable the updatedAt field since it doesn't exist in the table
});

module.exports = ClientReview;
