const mongoose = require("mongoose");

const NissanSchema = new mongoose.Schema({
  Brand_name: {
    type: String,
  },
  Logo: {
    type: String,
  },
  IPR: {
    type: String,
  },
  Designation: {
    type: String,
  },
  Status_date: {
    type: String,
  },
  Status: {
    type: String,
    enum: ["Registered", "Pending", "Expired"],
  },
  Number: {
    type: Number,
  },
  Office: {
    type: String,
  },
  Nice_classification: {
    type: String,
  },
  Owner: {
    type: String,
  },
});

module.exports = mongoose.model("Nissan", NissanSchema);
