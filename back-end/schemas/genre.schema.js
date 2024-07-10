const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: String
  },
  { timestamps: true}
);

module.exports = genreSchema;
