const mongoose=require("mongoose");
const MovieSchema = require("../schemas/movie.schema");
const MovieModel = mongoose.model("Movies",MovieSchema);
module.exports=MovieModel;