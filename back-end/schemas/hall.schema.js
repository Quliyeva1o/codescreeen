const mongoose = require("mongoose")
const HallSchema = new mongoose.Schema(
    {
        name: String,
        location:String,
        img: String,
        coverImg: String,
        address: String,
        parking: String,
        map: String,
        phone: String, 
        events: { type: Array, default: [] },
        tags: { type: Array, default: [] }
    },
    { timestamps: true }
);
module.exports = HallSchema;