const express = require("express");
const router = express.Router();
const service = require("../models/services");
const multer = require("multer");
const sharp = require("sharp");

const upload = multer({
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
  "/service/upload",
  upload.single("photo"),
  async (req, res) => {
    if(!req.file){
      return res.status(500).send({message:"please upload an image"})
    }
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 2048, height: 1080 })
      .toBuffer();
    const service2 = new service();
    service2.photoBuffer = buffer;
    service2.text=req.body.text;
    service2.isBg=req.body.isBg;
    service2.title=req.body.title;
    await service2.save();
    res.send({status:"success"});
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/service/photo/:id", async (req, res) => {
  try {
    const [service2] = await service.find({ _id: req.params.id });
    if (!service2 || !service2.photoBuffer) {
      if(!req.file){
        return res.status(500).send({message:"no image found"})
      }
    }
    // res.set("Content-type", "image/png");
    res.send(service2);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

router.get("/service/all", async (req, res) => {
  try {
    const response = await service.find({});
    if (!response.length) {
      throw new Error();
    }
    // res.set("Content-type","image/png")
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/service/update/:id",upload.single("photo"), async (req, res) => {
  try {
    const response = await service.findById(req.params.id);
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
    if(req.body.title){          
        response.title = req.body.title
    }
    if(req.body.isBg){
        response.isBg = req.body.title
    }
    // res.set("Content-type","image/png")
    await response.save()
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
