const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true,
    unique : true,
  },
})

console.log("Tag model -> Working Successfully")
module.exports = mongoose.model("Tag", tagSchema);