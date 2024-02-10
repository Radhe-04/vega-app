const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  photoBuffer: {
    type: Buffer,
    required: true,
  },
  title: {
    type: String,
    required:true
  },
  text:{
    type:String,
  },
  isBg : {
    type: Boolean,
    default:false
  }
});

const service = mongoose.model("service", serviceSchema);
module.exports = service;
