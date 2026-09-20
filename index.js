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

// Example student data used by the API.
// Each object represents one student with an id, name, and course.
const students = [
  {
    id: 1,
    name: "Ashham",
    course: "MERN Stack",
  },
  {
    id: 2,
    name: "Ayesha",
    course: "MERN Stack",
  },
  {
    id: 3,
    name: "Ibrahim",
    course: "Advanced Python",
  },
];

// GET /students
// Returns the complete list of students in JSON format.
app.get("/students", (request, response) => {
  response.json(students);
});

// GET /students/:id
// Finds a student whose id matches the value in the URL.
app.get("/students/:id", (request, response) => {
  // Convert the URL parameter from a string to a number.
  const id = Number(request.params.id);

  // Search the array for a student with the same id.
  const student = students.find((student) => student.id === id);

  // If no student is found, return a 404 error response.
  if (!student) {
    return response.status(404).json({
      message: "Student not found",
    });
  }

  // If the student exists, return the student data.
  return response.json(student);
});

// Start the server and keep it running to receive client requests.
app.listen(PORT, () => {
  console.log("Backend API Server running at http://localhost:3000");
});
