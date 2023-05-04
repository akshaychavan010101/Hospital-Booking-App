const mongoose = require("mongoose");

const slotsSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },

  doctorId: {
    type: Number,
    required: true,
  },

  patientId: {
    type: Number,
    required: true,
  },

  isbooked: {
    type: Boolean,
    default: false,
  },
});

const slots = mongoose.model("slots", slotsSchema);

module.exports = { slots };
