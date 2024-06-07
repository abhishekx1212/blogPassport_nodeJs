const express = require("express");
const {db} = require('./config/database')
const passport = require("passport")
const session = require("express-session") 
const adminrouter = require("./routers/admin_router");
const cookies = require('cookie-parser')
const path = require('path');
const { localAuth } = require("./middleware/middleware");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(session({secret:'private-key'}));

app.use(passport.initialize());

app.use(passport.session());

localAuth(passport);

app.set("view engine", "ejs");

app.use("/uploads", express.static("uploads"));

app.use(express.static(path.join(__dirname,'public')));

app.use(cookies());

app.use(adminrouter)

app.listen(8089, (err) => {
  db();
  if (!err) {
    console.log("http://localhost:8089");
  }
});