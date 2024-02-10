const mongoose = require('mongoose');
require('dotenv').config();
async function f(){
    await mongoose.connect(process.env.DATABASE_URL, {
      useUnifiedTopology: true,
    });
  }
f();