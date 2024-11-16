const ClientReview = require("../models/ClientReview");
const sequelize = require("../config/db");




async function addReview(data) {
  let transaction; // Define transaction variable here

  try {
   

    transaction = await sequelize.transaction(); // Initialize transaction



    const res = await ClientReview.create(data, {
      transaction,
    
      raw: true, // Specify that you want raw data
    });

    await transaction.commit();

    // Extract data values from the created records
   
    return { message: "Review Submitted Successfully" };
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

module.exports = addReview;
