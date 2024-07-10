const mongoose = require("mongoose")
const FoodSchema = new mongoose.Schema(
    {
        title:String,
        price:Number,
        foods:Array,
        drinks:Array,
        desc:String
    },
    { timestamps: true }
);
module.exports = FoodSchema;