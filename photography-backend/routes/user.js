const express = require('express');
const router = express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth')

// router.post('/createUser', async (req, res) => {
//   try {
//     const user =  new User(req.body);
//     await user.generateAuthToken()
//     res.status(201).send(user);
//   } catch (e) {
//     res.status(400).send(e);
//   }
// });
router.post('/signin', async (req, res) => {
    try {
      const user =await User.findOne({email: req.body.email})
      // user=user[0];
      if(user && user.password===req.body.password){
          await user.generateAuthToken();
          return res.status(200).send(user);
      }
      res.status(401).send({error: "invalid credentials"});
    } catch (e) {
      res.status(400).send(e);
    }
  });
router.post('/signout',auth, async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
     if(!user){
      throw new Error('User not found')
     }
     user.token= '';
     await user.save()
    res.status(200).send("signed out");
  } catch (e) {
    res.status(400).send({error: e});
  }
});


module.exports = router;