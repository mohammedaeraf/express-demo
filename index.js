// Import the Express library so we can create a web server.
const express = require("express");

// Create an Express application instance.
const app = express();

// Port is the number where our server will listen for requests.
const PORT = 3000;

// Handle GET requests sent to the home route ("/").
app.get("/", (request, response) => {
  response.send("Welcome to the Express JS Student API");
});

// Handle GET requests sent to the about route ("/about").
app.get("/about", (request, response) => {
  response.send("Express JS Student API Version 1.0 [Created by Aeraf]");
});

// Start the server and run this callback once it is ready.
app.listen(PORT, () => {
  console.log("Backend API Server running at http://localhost:3000");
});
