const mongoose = require("mongoose");
const genreSchema = require('../schemas/genre.schema');

const GenreModel = mongoose.model("Genres", genreSchema);

module.exports = GenreModel;