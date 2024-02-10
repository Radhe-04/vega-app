const express = require("express");
const router = express.Router();
const home = require("../models/home");
const multer = require("multer");
const sharp = require("sharp");
// const home= require('../models/home')
const upload = multer({
  // dest: "photos",
  limits: {
    fileSize: 1048576,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
      return cb(new Error("please upload jpg,jpeg or png file"));
    }
    cb(undefined, true);
  },
});
router.post(
  "/upload",
  upload.single("photo"),
  async (req, res) => {
    if(!req.file){
      return res.status(500).send({message:"please upload an image"})
    }
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 2048, height: 1080 })
      .toBuffer();
    // const buffer=req.file.buffer
    const home2 = new home();
    home2.photoBuffer = buffer;
    home2.text=req.body.text;
    // await req.user.save();
    await home2.save();
    res.send({status:"success"});
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/photo/:id", async (req, res) => {
  try {
    const [home2] = await home.find({ _id: req.params.id });
    if (!home2 || !home2.photoBuffer) {
      if(!req.file){
        return res.status(500).send({message:"no image found"})
      }
    }
    // res.set("Content-type", "image/png");
    res.send(home2);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

router.get("/all", async (req, res) => {
  try {
    const response = await home.find({});
    if (!response.length) {
      throw new Error();
    }
    // res.set("Content-type","image/png")
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.patch("/update/:id",upload.single("photo"), async (req, res) => {
  try {
    
    const response = await home.findById(req.params.id);
    // console.log(response)
    if (!response) {
      return res.status(500).send({message:"no image found"})
    }
    if(req.file){
      response.photoBuffer = await sharp(req.file.buffer)
      .resize({ width: 2048, height: 1080 })
      .toBuffer();
    }
    if(req.body.text){
      response.text=req.body.text
    }
    // res.set("Content-type","image/png")
    await response.save()
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
