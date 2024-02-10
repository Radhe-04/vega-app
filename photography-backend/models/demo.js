const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema(
  {
    photoBuffer: {
      type:Buffer,
    }
  },
);


const demo = mongoose.model("demo", demoSchema);
module.exports = demo;
