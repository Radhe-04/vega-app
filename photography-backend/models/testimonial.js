const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  photoBuffer: {
    type: Buffer,
  },
  title: {
    type: String,
    required:true
  },
  text:{
    type:String,
  },
  authorName: {
    type: String
  }
});

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
