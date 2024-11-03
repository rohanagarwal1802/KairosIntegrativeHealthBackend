const { Op } = require("sequelize");
const PatientDetails = require("../../models/PatientDetails");
const sequelize = require("../../config/db");

async function userExists(userData) {
  // Validate userData format

  console.log("userData ==>",userData)
  if (!Array.isArray(userData) || userData.length === 0) {
    console.error("Invalid user data provided.");
    return { emails: [], mobiles: [] };
  }

  try {
    // Extract emails and mobiles
    const { emails, mobiles } = userData.reduce(
      (acc, data) => {
        if (data.email) acc.emails.push(data.email);
        if (data.mobile) acc.mobiles.push(data.mobile);
        return acc;
      },
      { emails: [], mobiles: [] }
    );

    // Log connection pool size
    const connectionManager = sequelize.connectionManager;
    if (connectionManager) {
      const pool = connectionManager.pool;
      console.log("Total connections:", pool.size);
    } else {
      console.error("Sequelize connection manager is not available.");
    }

    // Fetch existing users
    const existingUsers = await PatientDetails.findAll({
      attributes: ["email", "mobile"],
      where: {
        [Op.or]: [
          { email: { [Op.in]: emails } },
          { mobile: { [Op.in]: mobiles } },
        ],
      },
    });

    console.log("Existing users found:", existingUsers);

    // Use Sets to ensure uniqueness
    const existingEmails = new Set();
    const existingMobiles = new Set();

    existingUsers.forEach((user) => {
      if (emails.includes(user.email)) existingEmails.add(user.email);
      if (mobiles.includes(user.mobile)) existingMobiles.add(user.mobile);
    });

    // Prepare result
    const result = {
      emails: Array.from(existingEmails),
      mobiles: Array.from(existingMobiles),
    };

    return result;
  } catch (error) {
    console.error("Error checking existing users:", error);
    return { emails: [], mobiles: [] }; // Return an empty object on error
  }
}

module.exports = userExists;
