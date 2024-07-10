const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema(
  {
    movieId: String,
    movie:String,
    showTimes:Object
  },
  { timestamps: true }
);

module.exports = timeSchema;
