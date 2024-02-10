const mongoose = require("mongoose");

const portfolio_videoSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required:true
  },
  text:{
    type:String,
    required:true
  },
  isBg : {
    type: Boolean,
    default:false
  }
});

const portfolio_video = mongoose.model("portfolio_video", portfolio_videoSchema);
module.exports = portfolio_video;
