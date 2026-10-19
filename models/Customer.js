const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  creditLimit: { type: Number, min: 10000, max: 50000},
  isActive: {type: Boolean, default: true}
},
{
    timestamps: true
});

module.exports = mongoose.model("Customer", customerSchema);
