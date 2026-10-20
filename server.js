const dns = require("node:dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Express app connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(3000, () => {
  console.log("Express App running on port 3000");
});

const Customer = require("./models/Customer");

app.post("/customers", async (req, res) => {
  const customer = new Customer(req.body);
  const savedCustomer = await customer.save();

  res.status(201).json(savedCustomer);
});

app.get("/customers", async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});
