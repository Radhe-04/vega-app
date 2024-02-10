const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");

const portfolioSchema = new mongoose.Schema({
  photoBuffer: {
    type: Buffer,
    required: true,
  },
  title: {
    type: String,
    required:true
  },
  isBg : {
    type: Boolean,
    default:false
  }
});

const portfolio = mongoose.model("portfolio", portfolioSchema);
module.exports = portfolio;
