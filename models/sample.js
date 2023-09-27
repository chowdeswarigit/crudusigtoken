const mongoose = require("mongoose");

const SampleSchema = mongoose.Schema(
  {
   
    firstname: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    lastname:{
      type:String,
      required :true
    }
  }
);

module.exports = mongoose.model("Sample", SampleSchema);
