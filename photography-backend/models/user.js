const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required:true
  },
 password: {
    type: String,
    required: true
 },
 token: {
    type: String,
 }
});

userSchema.methods.generateAuthToken = async function () {
    console.log("lll")
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() },'asdfghjkl',{expiresIn:'8h'});
    user.token = token;
    await user.save();
    return token;
  };

const User = mongoose.model("User", userSchema);
module.exports = User;  