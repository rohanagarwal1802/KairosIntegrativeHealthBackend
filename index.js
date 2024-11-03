const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // Ensure this path points correctly to your db.js
const Auth = require('./routes/auth');
const morgan = require('morgan');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(morgan('combined'));

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Use authentication routes
app.use('/api', Auth);

// Function to start server and connect to the database
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected...');
    await sequelize.sync(); // Sync models with database

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // Exit the process if unable to connect
  }
};

// Start the server
startServer();
