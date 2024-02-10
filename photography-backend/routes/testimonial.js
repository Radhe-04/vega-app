const express = require("express");
const router = express.Router();
const Testimonial = require("../models/testimonial");
const multer = require("multer");
const sharp = require("sharp");
// const portfolio= require('../models/portfolio')
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
  "/testimonial/upload",
  upload.single("photo"),
  async (req, res) => {
    const testimonial = new Testimonial();

    if(req.file){
        const buffer = await sharp(req.file.buffer)
          .resize({ width: 2048, height: 1080 })
          .toBuffer();
          testimonial.photoBuffer = buffer;
    }
    // const buffer=req.file.buffer
    testimonial.title = req.body.title;
    testimonial.text = req.body.text;
    testimonial.authorName = req.body.authorName
    await testimonial.save();
    res.send({ status: "success" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);



router.get("/testimonial/all", async (req, res) => {
  try {
    const response = await Testimonial.find({});
    if (!response.length) {
      throw new Error();
    }
    // res.set("Content-type","image/png")
    return res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/testimonial/:id", async (req, res) => {
    try {
      const [testimonial] = await Testimonial.find({ _id: req.params.id });
      if (!testimonial) {
          return res.status(500).send({ message: "no object found" });
      }
      // res.set("Content-type", "image/png");
      return res.send(testimonial);
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }
  });

router.patch(
  "/testimonial/:id",
  upload.single("photo"),
  async (req, res) => {
    try {
      const response = await Testimonial.findById(req.params.id);
      console.log(response)
      if (!response) {
        return res.status(500).send({ message: "no image found" });
      }
      if (req.file) {
        response.photoBuffer = await sharp(req.file.buffer)
          .resize({ width: 2048, height: 1080 })
          .toBuffer();
      }
      if (req.body.title) {
        response.title = req.body.title;

      }
      if (req.body.authorName) {
        response.authorName = req.body.authorName;
      }
      // res.set("Content-type","image/png")
      await response.save();
      res.send({ status: "success" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);
module.exports = router;
