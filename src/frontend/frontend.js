const express = require('express');
const app = express();
const port = 3000; // Choose a port number

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to Bazar.com!');
});

// Start the server
app.listen(port, () => {
  console.log(`Frontend server running at http://localhost:${port}`);
});