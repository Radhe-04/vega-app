const express = require("express");

const cors = require('cors');
const demoROuter = require('./routes/demo.js');
const homeRouter=require('./routes/home.js')
const portfolioRouter = require('./routes/portfolio.js')
const serviceRouter=require('./routes/service.js')
const userRouter=require('./routes/user.js')
const portfolio_videoRouter = require('./routes/portfolio_video.js')
const testimonialRoute = require('./routes/testimonial.js')
const path = require('path')
const demo = require("./models/demo.js");
require('./db/db')
let pathComp= require("express-static");
var engines = require('consolidate');
const app = express()
const parentDir = path.resolve(__dirname, '..');


app.use(express.static(path.join(parentDir, '/photography/Upload')));

app.set('views', parentDir + '/photography/Upload');
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.get('/', function(req, res) {
    res.render('index.html');
});
app.get('/about', function(req, res) {
    res.render('about2.html');
});
app.get('portfolio/', function(req, res) {
    res.render('portfolio2.html');
});
app.get('/portfolio-video', function(req, res) {
    res.render('portfolio-video.html');
});
app.get('/service', function(req, res) {
    res.render('services1.html');
});
app.get('/tesinomial', function(req, res) {
    res.render('testinomial.html');
});
app.get('/clients', function(req, res) {
    res.render('clients.html');
});
app.get('/contact', function(req, res) {
    res.render('contacts1.html');
});

app.use((req, res, next) => {
    res.redirect('http://localhost:5000/'); // Replace 'https://example.com' with your desired URL
  });
app.listen(5000, () => {
    console.log("frontend  is running on port 5000 => http://localhost:5000/");
  });
