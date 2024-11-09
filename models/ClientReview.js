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
  no_of_stars: {
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
    allowNull: true,
  },
  
}, {
  // Specify custom field names for timestamps and enable paranoid
  // timestamps: true, // Enable timestamps
  createdAt: 'created_at', // Specify the custom name for createdAt
});


module.exports = ClientReview;
