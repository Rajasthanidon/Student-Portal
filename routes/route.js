const express = require("express");
const router = express.Router();
const db = require("../database/db");
const checklogin = require("../middleware/auth");
const adminlogin = require("../middleware/adminauth");
const ownerlogin = require("../middleware/ownerauth");
const upload = require("../middleware/upload");
const path = require("path");
const xlsx = require("xlsx");
const searchcontroller = require("../controller/searchcontroller");
const apicontroller = require("../controller/apicontroller");

router.get("/",(req,res)=>{
    const msg = req.session.message;
    res.render("index",{msg});
    delete req.session.message;
    
});
router.post("/",searchcontroller.login);
router.get("/add/user",adminlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "user"
    res.render("adduser",{msg});
    delete req.session.message;
   
});
router.post("/add/user",searchcontroller.adduser);
router.get("/add/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "admin";
    res.render("addadmin",{msg});
    delete req.session.message;
    
});
router.post("/add/admin",searchcontroller.adduser);
router.get("/delete/user",adminlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "user";
    res.render("deleteuser",{msg});
    delete req.session.message;
    
});
router.post("/delete/user",searchcontroller.deleteuser);
router.get("/delete/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "admin";
    res.render("deleteadmin",{msg});
    delete req.session.message;
   
});
router.post("/delete/admin",searchcontroller.deleteuser);
router.get("/delete/data",adminlogin,(req,res)=>{
    res.render("deletedata");
   
});
router.post("/delete/data",(req,res)=>{
    req.session.message= "DELETED"
    res.redirect("/admin_dashboard");
    
});
router.get("/search",checklogin,(req,res)=>{
    res.render("search");
    
});
router.post("/search",searchcontroller.search);
router.get("/admin_dashboard",adminlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("admin_dashboard",{msg});
    delete req.session.message;
    
});
router.get("/logout",checklogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send(err.message);
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
        
    });
});
router.get("/import",adminlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("upload",{msg});
    delete req.session.message;
  
})
router.post("/import",upload.single("excel"),async (req,res)=>{
  
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    req.session.message="FILE SUCCESFULLY UPLOADED"
    
    res.redirect("/import")
});
router.get("/user_dashboard",checklogin,(req,res)=>{
   
   const msg = req.session.message;
    return res.render("user_dashboard",{msg});
})
router.get("/result",(req,res)=>
{
    const users = req.session.message;
    res.render("result",{users});
    delete req.session.message;
   
});
router.get("/update/data",adminlogin,(req,res)=>{
   
    res.render("updatedata");
});
router.post("/update/data",(req,res)=>{
    req.session.message = "UPDATED";
   
    res.redirect("/admin_dashboard");
});
router.get("/update/request",checklogin,(req,res)=>{
   
    res.render("requestupdate");
});
router.post("/update/request",(req,res)=>{
    req.session.message = "REQUEST SENT";
    
    res.redirect("/user_dashboard");
});
router.get("/delete/data/request",checklogin,(req,res)=>{
    
    res.render("requestdelete");
});
router.post("/delete/data/request",(req,res)=>{
    req.session.message = "REQUEST SENT";
    
    res.redirect("/user_dashboard");
});
router.get("/register",adminlogin,(req,res)=>{
req.session.role="owner";
res.render("register")});
router.get("/api/students",checklogin,apicontroller.getstudent);


module.exports = router;