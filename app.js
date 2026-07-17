const express = require("express");
require("./database/db");
const path = require("path");
const session = require("express-session");
const app = express();
app.use(express.urlencoded({extended:true}));
const webroute = require("./routes/route");
app.use(session({
    secret: "mysecretkey",
    resave:false,
    saveUninitialized:false
}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"pages"));
app.use(express.static("public"));
app.use("/",webroute);
module.exports = app;