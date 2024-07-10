const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    movieId: String,
    movie:String,
    cinemaId:String,
    time:String,
    tag:String,
    seats:Array
  },
  { ticketstamps: true }
);

module.exports = ticketSchema;
