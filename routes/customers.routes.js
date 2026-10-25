const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const validateCustomer = require("../middlewares/validateCustomer");

// CRUD - Create, Read, Update and Delete

// Create a customer and return the saved document with a 201 Created status.
router.post("/", validateCustomer, async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const query = req.query;

    let filter = {};

    if (query.name) {
      filter.name = query.name;
    }

    console.log(filter);

    // Customer.find() returns all records
    const customers = await Customer.find(filter);

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch customers",
    });
  }
});

// Look up one customer by its MongoDB document ID.
router.get("/:id", async (req, res) => {
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

// Create a customer and return the saved document with a 201 Created status.
router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json({
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update customer",
      error: error.message,
    });
  }
});

module.exports = router;
