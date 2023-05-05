const mongoose = require("mongoose");

const connection = mongoose.connect(process.env.MONGO_URL);

module.exports = { connection };
