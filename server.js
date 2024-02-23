const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const port = 3000;

// MongoDB connection
const dbURI = process.env.DB_URI; 
mongoose.connect(dbURI); 

// Get the default connection
const dbConnection = mongoose.connection;

// Event listener for successful connection
dbConnection.on('connected', () => { 
  console.log('📦 Connected to MongoDB');
});

// Event listener for connection error
dbConnection.on('error', (err) => { 
  console.error('❌ MongoDB connection error:', err.message);
});

// Defining the ping route with JSON response
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});
 
// Home route to display database connection status
app.get('/', (req, res) => {
  const connectionStatus = dbConnection.readyState === 1 ? 'connected' : 'disconnected';
  res.send(`Database connection status: ${connectionStatus}`);
});

// Starting the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
