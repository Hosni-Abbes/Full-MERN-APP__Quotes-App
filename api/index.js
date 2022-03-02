//IMPORT PACKAGES
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//IMPORT ROUTES FROM ROUTES FOLDER
const postsRoute = require("./routes/posts");
const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");

//INITIALIZE APP
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

//USE CROS ORIGIN TO ALLOW REQUEST FROM OTHER ADRESS
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "*");
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

//USE BODY-PARSER TO GET ALL DATA IN JSON FORMAT
app.use(bodyParser.json());

//CONNECT TO DATABASE USING MONGOOSE
mongoose
  .connect(process.env.DB_CONNECT)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err));

//APPLICATION ROUTES
app.use("/", postsRoute); //POSTS ROUTE
app.use("/", usersRoute); //USERS ROUTE
app.use("/auth", authRoute); //AUTH ROUTE

//RUN THE APPLICATION ON SERVER
app.listen(PORT, () => {
  console.log("Server running");
});
