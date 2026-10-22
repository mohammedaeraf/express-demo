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

// Logger Middleware
const logger = (req, res, next) => {
  console.log("Request recieved:", req.method, req.url, req.body);
  next();
}

app.use(logger);

const customerRoutes = require("./routes/customers.routes");
app.use("/customers", customerRoutes)





