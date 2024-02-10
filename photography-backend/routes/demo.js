// const express = require("express");
// const router = express.Router();
// const demo = require("../models/demo");
// const multer = require("multer");
// const sharp = require("sharp");
// const upload = multer({
//   dest: "avatar",
//   limits: {
//     fileSize: 1048576,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/.(jpg|jpeg|png)$/)) {
//       return cb(new Error("please upload jpg,jpeg or png file"));
//     }
//     cb(undefined, true);
//   },
// });
// router.post(
//   "/upload",
//   upload.single("avatar"),
//   async (req, res) => {
//     const buffer = await sharp(req.file.buffer)
//       .resize({ width: 3840, height: 2160 })
//       .toBuffer();
//     // const buffer=req.file.buffer
//     const demo2 = new demo();
//     demo2.photoBuffer = buffer;

//     // await req.user.save();
//     await demo2.save();
//     res.send({status:"success"});
//   },
//   (error, req, res, next) => {
//     res.status(400).send({ error: error.message });
//   }
// );

// router.get("/avatar/:id", async (req, res) => {
//   try {
//     const [demo2] = await demo.find({ _id: req.params.id });
//     if (!demo2 || !demo2.photoBuffer) {
//       throw new Error();
//     }
//     res.set("Content-type", "image/png");

//     res.send(demo2.photoBuffer);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
// router.get("/all", async (req, res) => {
//   try {
//     const response = await demo.find({});
//     if (!response.length) {
//       throw new Error();
//     }
//     // res.set("Content-type","image/png")
//     console.log(response.length);
//     res.send(response);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });
// module.exports = router;
