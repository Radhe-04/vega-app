const express = require("express");
const router = express.Router();
const Portfolio_video = require("../models/portfolio_video");


router.post(
  "/link/upload",  async (req, res) => {
      const portfolio_video = new Portfolio_video();
      portfolio_video.link = req.body.link
    portfolio_video.text=req.body.text;
    portfolio_video.isBg=req.body.isBg;
    portfolio_video.title=req.body.title;
    await portfolio_video.save();
    res.send({status:"success"});
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/link/:id", async (req, res) => {
  try {
    const [portfolio_video2] = await Portfolio_video.find({ _id: req.params.id });
    console.log(portfolio_video2)
    if (!portfolio_video2 || !portfolio_video2.link) {
      if(!req.file){
        return res.status(500).send({message:"no link found"})
      }
    }
    // res.set("Content-type", "image/png");
    res.send(portfolio_video2);
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
});

router.get("/link/all", async (req, res) => {
  try {
    const response = await Portfolio_video.find({});
    if (!response.length) {
      throw new Error();
    }
    // res.set("Content-type","image/png")
    res.send(response);
  } catch (error) {
    res.status(400).send(error);
  }
});



router.patch("/link/update/:id", async (req, res) => {
  try {
    
    const response = await Portfolio_video.findById(req.params.id);
    // console.log(response)
    if (!response) {
      return res.status(500).send({message:"no image found"})
    }
    if(req.link){
      response.link = response.body.link
      .resize({ width: 3840, height: 2160 })
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
