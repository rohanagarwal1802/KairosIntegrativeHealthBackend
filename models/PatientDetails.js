'use strict';

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.js");

const Patients = sequelize.define("Patient_Details", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Validate email format
    },
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      is: /^\d{10}$/, // Regex to ensure a 10-digit mobile number
    },
  },
  timeSlot: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  whitelist: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  service: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Automatically set to now when created
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW, // Automatically set to now when updated
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  willing_recommened_treatment_plan: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  thinking_about_harming_themselves: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  experiencing_beliefs: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  document_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  hasRecievedDiagnosisOrHaveSymptoms: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  struggling_with_substance_use: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  // Specify custom field names for timestamps
  timestamps: true, // Enable timestamps
  createdAt: 'created_at', // Specify the custom name for createdAt
  updatedAt: 'updated_at', // Specify the custom name for updatedAt
});

// Hook to set updated_at before updating
Patients.beforeUpdate((patient) => {
  patient.updated_at = new Date();
});

module.exports = Patients;
