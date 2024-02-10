const express = require("express");

const cors = require('cors');
const demoROuter = require('./routes/demo.js');
const homeRouter=require('./routes/home.js')
const portfolioRouter = require('./routes/portfolio.js')
const serviceRouter=require('./routes/service.js')
const userRouter=require('./routes/user.js')
const portfolio_videoRouter = require('./routes/portfolio_video.js')
const testimonialRoute = require('./routes/testimonial.js')
const demo = require("./models/demo.js");
const engines = require('consolidate');
const path = require('path')
const parentDir = path.resolve(__dirname, '..');

require('./db/db')

const app = express();

app.use(cors());
// app.use(cors({
//   origin: "*",
//   methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'ANY', 'PUT'],
//   allowedHeaders: ['Authorization', 'Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'Connection'],
//   credentials: true,
//   optionsSuccessStatus: 200
// }))
  
app.use(express.json())
// app.use(demoROuter)
app.use(homeRouter)
app.use(portfolioRouter)

app.use(userRouter)

app.use(serviceRouter)
app.use(portfolio_videoRouter)
app.use(testimonialRoute)



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



app.listen(3000, () => {
  console.log("app is running");
});
