const axios = require("axios");
const PatientDetails = require("../models/PatientDetails");
const userExists = require("./common/userExists");
const sequelize = require("../config/db");
const jwt = require("jsonwebtoken");

async function createBulkTokens(userData) {
  userData.forEach((user) => {
    const token = jwt.sign({ email: user.email }, process.env.secretKey, {
      expiresIn: "24h",
    });
    user.whitelist = token;
  });

  return userData;
}

async function addPatients(userData) {
  let transaction; // Define transaction variable here

  try {
    const similarEmailMobile = await userExists(userData);
    console.log("similarEmailMobile ==>", similarEmailMobile);

    if (
      similarEmailMobile?.emails.length === userData.length ||
      similarEmailMobile?.mobiles.length === userData.length
    ) {
      return { passed: 0, failed: similarEmailMobile };
    }

    transaction = await sequelize.transaction(); // Initialize transaction

    await createBulkTokens(userData);

    const filteredUserData = userData.filter((user) => {
      return (
        !similarEmailMobile?.emails.includes(user.email) &&
        !similarEmailMobile?.mobiles.includes(user.mobile)
      );
    });

    const res = await PatientDetails.bulkCreate(filteredUserData, {
      transaction,
      ignoreDuplicates: true,
      returning: true, // Ensure it returns the created records
      attributes: ["email"],
      raw: true, // Specify that you want raw data
    });

    await transaction.commit();

    // Extract data values from the created records
    const passedRecords = res.map((record) => ({
      email: record.dataValues.email,
      mobile: record.dataValues.mobile,
    }));

    return { passed: passedRecords, failed: similarEmailMobile };
  } catch (error) {
    console.log(error);
    
    // Check if transaction is defined before rolling back
    if (transaction) {
      await transaction.rollback();
    }

    // Optionally, rethrow the error or return a custom error response
    throw new Error("Failed to add patients due to an error."); 
  }
}

module.exports = addPatients;
