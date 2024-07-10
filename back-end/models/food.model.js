const mongoose=require("mongoose");
const FoodSchema = require("../schemas/food.schema");
const FoodModel = mongoose.model("Foods",FoodSchema);
module.exports=FoodModel;