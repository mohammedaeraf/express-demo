const validateCustomer = (request, response, next) => {
  const customerObj = request.body;

  // Check Name
  if (!customerObj.name) {
    return response.status(400).json({
      message: "Name is a required field",
    });
  }

  // Check Email
  if (!customerObj.email) {
    return response.status(400).json({
      message: "Email is a required field",
    });
  }

  // Check Phone
  if (!customerObj.phone) {
    return response.status(400).json({
      message: "Phone No is a required field",
    });
  }

  // proceed to next step, etc
  next();
};

module.exports = validateCustomer;
