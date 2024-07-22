const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
mongoose.connect("");

module.exports = mongoose;
