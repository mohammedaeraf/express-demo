// Import the Express library so we can create a web server.
const express = require("express");

// Create an Express application instance.
const app = express();

// Port is the number where our server will listen for requests.
const PORT = 3000;

// Parse JSON Request Bodies
app.use(express.json());

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

app.get("/students/search", (request, response) => {
  // Read the name from the query string, for example: /students/search?name=ash.
  // Convert it to lowercase so the search is not affected by capitalization.
  const name = request.query.name.toLowerCase();

  // Find student with exact match (case ignored)
  // const student = students.find(
  //   (student) => student.name.toLowerCase() === name,
  // );

  // Return every student whose name contains the searched text.
  // filter() returns an array, even when no students match the search.
  const student = students.filter((student) =>
    student.name.toLowerCase().includes(name),
  );

  // An empty array is truthy, so check its length to detect no matches.
  if (student.length === 0) {
    return response.status(404).json({
      message: "Student not found",
    });
  }

  // Send the matching students back to the client as JSON.
  response.json(student);
});

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

// POST /students
// Adds the new student record in the students array
app.post("/students", (request, response) => {
  const studentData = request.body;

  // validation
  if (!studentData.name || !studentData.course) {
    return response.status(400).json({
      message: "Student Name and Course are required",
    });
  }

  const student = {
    id: students.length + 1,
    name: studentData.name,
    course: studentData.course,
  };

  students.push(student);
  
  return response.status(201).json({
    message: "Student record created successfully",
    newRecord: student
  });

});

// Start the server and keep it running to receive client requests.
app.listen(PORT, () => {
  console.log("Backend API Server running at http://localhost:3000");
});
