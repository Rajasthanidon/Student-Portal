const express = require("express");
const router = express.Router();
const db = require("../database/db");
const checklogin = require("../middleware/auth");
const adminlogin = require("../middleware/adminauth");
const ownerlogin = require("../middleware/ownerauth");
const upload = require("../middleware/upload");
const path = require("path");

const searchcontroller = require("../controller/searchcontroller");
const apicontroller = require("../controller/apicontroller");

router.get("/",(req,res)=>{
    const msg = req.session.message;
    res.render("index",{msg});
    delete req.session.message;
    
});
router.post("/",searchcontroller.login);
router.get("/add/user",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "user"
    res.render("adduser",{msg});
    delete req.session.message;
   
});
router.post("/add/user",ownerlogin,searchcontroller.adduser);
router.get("/add/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "admin";
    res.render("addadmin",{msg});
    delete req.session.message;
    
});
router.post("/add/admin",ownerlogin,searchcontroller.adduser);
router.get("/delete/user",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "user";
    res.render("deleteuser",{msg});
    delete req.session.message;
    
});
router.post("/delete/user",ownerlogin,searchcontroller.deleteuser);
router.get("/delete/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    req.session.role = "admin";
    res.render("deleteadmin",{msg});
    delete req.session.message;
   
});
router.post("/delete/admin",ownerlogin,searchcontroller.deleteuser);
router.get("/delete/data",ownerlogin,(req,res)=>{
    res.render("deletedata");
   
});
router.post("/delete/data",ownerlogin,(req,res)=>{
    req.session.message= "DELETED"
    res.redirect("/admin_dashboard");
    
});
router.get("/search",ownerlogin,(req,res)=>{
    res.render("search");
    
});
router.post("/search",ownerlogin,searchcontroller.search);
router.get("/admin_dashboard",ownerlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("admin_dashboard",{msg});
    delete req.session.message;
    
});
router.get("/logout",ownerlogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send(err.message);
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
        
    });
});
router.get("/import",ownerlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("upload",{msg});
    delete req.session.message;
  
})
router.post("/import",ownerlogin,upload.single("excel"),searchcontroller.importdata);
router.get("/user_dashboard",ownerlogin,(req,res)=>{
   
   const msg = req.session.message;
    return res.render("user_dashboard",{msg});
})
router.get("/result",ownerlogin,(req,res)=>
{
    const users = req.session.message;
    res.render("result",{users:users});
    delete req.session.message;
   
});
router.get("/update/data",ownerlogin,(req,res)=>{
    
    res.render("updatedata");
});
router.post("/update/data",ownerlogin,searchcontroller.add);
router.get("/update/request",ownerlogin,(req,res)=>{
   
    res.render("requestupdate");
});
router.post("/update/request",ownerlogin,(req,res)=>{
    req.session.message = "REQUEST SENT";
    
    res.redirect("/user_dashboard");
});
router.get("/delete/data/request",ownerlogin,(req,res)=>{
    
    res.render("requestdelete");
});
router.post("/delete/data/request",ownerlogin,(req,res)=>{
    req.session.message = "REQUEST SENT";
    
    res.redirect("/user_dashboard");
});
router.get("/register",ownerlogin,(req,res)=>{
req.session.role="owner";
res.render("register")});
router.get("/api/students",ownerlogin,apicontroller.getstudent,()=>{
    console.log("fetching")
});


module.exports = router;