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

app.listen(3000, () => {
  console.log("app is running");
});
