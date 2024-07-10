const mongoose=require("mongoose");
const UserSchema = require("../schemas/user.schema");
const UserModel = mongoose.model("Users",UserSchema);
module.exports=UserModel;