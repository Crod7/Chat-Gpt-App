//Imports
require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT

// Middleware
app.use(express.json());
// Cors

// Routes will go under here

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

