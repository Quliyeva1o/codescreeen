const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema(
    {
        name: String,
        director: String,
        cast: String,
        bgImg: String,
        genres: String,
        rating: String,
        description: String,
        runTime: Number,
        coverImg: String,
        trailers: { type: Array, default: [] },
        releaseDate: String,
        ageRes: Number,
        sessionTimes: { type: Array, default: [] }
    },
    { timestamps: true }
);
module.exports = MovieSchema;