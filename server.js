const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
// Parse JSON request bodies so routes can read submitted customer data from req.body.
app.use(express.json());

// Connect to MongoDB using the connection string configured in the environment.
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Express app connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("Express App running on port 3000");
});

const Customer = require("./models/Customer");

// Create a customer and return the saved document with a 201 Created status.
app.post("/customers", async (req, res) => {
  try {
    const customer = new Customer(req.body);
    const savedCustomer = await customer.save();

    res.status(201).json({
      message: "Customer created successfully",
      data: savedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create customer",
      error: error.message,
    });
  }
});

// Return all customer documents from the database.
app.get("/customers", async (req, res) => {
  try {
    const customers = await Customer.find();

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});

// Look up one customer by its MongoDB document ID.
app.get("/customers/:id", async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);

    if (!customer) {
      // A valid ID with no matching document is a not-found response.
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (error) {
    res.status(400).json({
      message: "Invalid Customer ID",
    });
  }
});
