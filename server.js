const express = require('express');
const app = express();
const port = 3000; 

// Defining the ping route with JSON response
app.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

// Starting the server
if (require.main === module) {
  app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
  });
}

module.exports = app;
