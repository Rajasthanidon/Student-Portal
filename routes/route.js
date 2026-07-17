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
    console.log("open login");
});
router.post("/",searchcontroller.login);
router.get("/add/user",adminlogin,(req,res)=>{
    const msg = req.session.message;
    res.render("adduser",{msg});
    delete req.session.message;
    console.log(" add user page");
});
router.post("/add/user",(req,res)=>{
    const username = req.body.username;
    const pass =  req.body.password;
    const name = req.body.name;
    db.run(`INSERT INTO users (name,username,password,role) VALUES (?,?,?,"user")`,[name,username,pass],(err)=>{
        if(err){
            res.send(err.message);
        }
        else{
            req.session.message = "USER ADDED";
            console.log("user added");
            return res.redirect("/admin_dashboard");
        }
    });
});
router.get("/add/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    res.render("addadmin",{msg});
    delete req.session.message;
    console.log("add admin page");
});
router.post("/add/admin",(req,res)=>{
    const username = req.body.username;
    const pass =  req.body.password;
    const name = req.body.name;
    db.run(`INSERT INTO users (name,username,password,role) VALUES (?,?,?,"admin")`,[name,username,pass],(err)=>{
        if(err){
            res.send(err.message);
        }
        else{
            req.session.message = "ADMIN ADDED";
            console.log("admin added");
            return res.redirect("/admin_dashboard");
        }
    });
});
router.get("/delete/user",adminlogin,(req,res)=>{
    const msg = req.session.message;
    res.render("deleteuser",{msg});
    delete req.session.message;
    console.log("delete user page");
});
router.post("/delete/user",searchcontroller.deleteuser);
router.get("/delete/admin",ownerlogin,(req,res)=>{
    const msg = req.session.message;
    res.render("deleteadmin",{msg});
    delete req.session.message;
    console.log("delete admin page");
});
router.post("/delete/admin",(req,res)=>{
    const name = req.body.name;
    const username = req.body.username;
    db.get(`SELECT * FROM users WHERE username = ? AND name = ?`,[username,name],(err,row)=>{
        if(err){
            return res.send(err.message);
        }
        if(!row){
            console.log("admin not exists");
            req.session.message = "ADMIN NOT EXISTS";
            return res.redirect("/delete/admin");
        }
        if(row){
            db.run(`DELETE FROM users WHERE id = ?`,[row.id],(err)=>{
                if(err){
                    return res.send(err.message);
                }
                console.log("admin deleted");
                req.session.message = "ADMIN DELETED SUCCESFULLY";
                return res.redirect("/admin_dashboard");
            });
        }
    });
});
router.get("/delete/data",adminlogin,(req,res)=>{
    res.render("deletedata");
    console.log("delete data page");
});
router.post("/delete/data",(req,res)=>{
    req.session.message= "DELETED"
    res.redirect("/admin_dashboard");
    console.log("data deleted");
});
router.get("/search",(req,res)=>{
    res.render("search");
    console.log("search page");
});
router.post("/search",searchcontroller.search);
router.get("/admin_dashboard",adminlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("admin_dashboard",{msg});
    delete req.session.message;
    console.log("open admin dash");
});
router.get("/logout",checklogin,(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.send(err.message);
        }
        res.clearCookie("connect.sid");
        res.redirect("/");
        console.log("logout");
    });
});
router.get("/import",adminlogin,(req,res)=>{
    const msg = req.session.message;
     res.render("upload",{msg});
    delete req.session.message;
    console.log("import");
})
router.post("/import",upload.single("excel"),async (req,res)=>{
    console.log(req.file);
    const workbook = xlsx.readFile(req.file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    req.session.message="FILE SUCCESFULLY UPLOADED"
    console.log("uploaded");
    res.redirect("/import")
});
router.get("/user_dashboard",checklogin,(req,res)=>{
   console.log("user dash");
   const msg = req.session.message;
    return res.render("user_dashboard",{msg});
})
router.get("/result",(req,res)=>
{
    const users = req.session.message;
    res.render("result",{users});
    delete req.session.message;
    console.log("showing result");
});
router.get("/update/data",adminlogin,(req,res)=>{
    console.log("update data page");
    res.render("updatedata");
});
router.post("/update/data",(req,res)=>{
    req.session.message = "UPDATED";
    console.log("updated");
    res.redirect("/admin_dashboard");
});
router.get("/update/request",checklogin,(req,res)=>{
    console.log("requssted updated");
    res.render("requestupdate");
});
router.post("/update/request",(req,res)=>{
    req.session.message = "REQUEST SENT";
    console.log("requested");
    res.redirect("/user_dashboard");
});
router.get("/delete/data/request",checklogin,(req,res)=>{
    console.log("request delete page");
    res.render("requestdelete");
});
router.post("/delete/data/request",(req,res)=>{
    req.session.message = "REQUEST SENT";
    console.log("delete request sent");
    res.redirect("/user_dashboard");
});


module.exports = router;