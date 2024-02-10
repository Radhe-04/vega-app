const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    photoBuffer: {
    // required:true,
      type:Buffer,
    },
    text:{
        // required:true,
        type:String,
    }
  },
);


const home = mongoose.model("home", homeSchema);
module.exports = home;
