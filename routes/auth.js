const express = require('express');
const Patients = require('../models/PatientDetails');
const ClientReview = require("../models/ClientReview"); // Adjust path as necessary
const router = express.Router();
const requireAll = require("require-all");
const path = require("path");
const queryDirectoryPath = path.join(__dirname, "../query");
const allQuery = requireAll({
  dirname: queryDirectoryPath,
  filter: /(.+)\.js$/,
  recursive: true,
});

// Example route to get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patients.findAll(); // Fetch all patients
    res.json(patients);
  } catch (error) {
    console.error('Error fetching patients:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Register a partner user under a partner id with necessary info.
router.post("/register_patients", async (request, response) => {
  const addPatients = allQuery["addPatients"];
  if (!addPatients) {
    return response.status(500).json({ message: "addPatients function not found." });
  }
  
  try {
    const result = await addPatients([request.body]);
    return result?.passed
      ? response.status(201).json({ message: "Patient registered successfully", data: result })
      : response.status(400).json({ message: "Failed to register patient", data: result});
  } catch (error) {
    console.error('Error registering patient:', error.message);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// Example route to get all reviews
router.get('/reviews', async (req, res) => {
  try {
    const reviews = await ClientReview.findAll(); // Fetch all reviews from the database
    return res.status(200).json({
      message: "Reviews Generated Successfully.",
      reviews: reviews
    });  // Sending the reviews as a JSON response
  } catch (error) {
    console.error('Error fetching reviews:', error.message);
    res.status(500).json({ error: error.message });  // Handling errors with a 500 status
  }
});

//Add Reviews.
router.post("/reviews", async (request, response) => {
  const addReviews = allQuery["addReviews"];
  if (!addReviews) {
    return response.status(500).json({ message: "addReviews function not found." });
  }
  
  try {
    const result = await addReviews(request.body);
    return result
  } catch (error) {
    console.error('Error registering patient:', error.message);
    response.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});


module.exports = router;
