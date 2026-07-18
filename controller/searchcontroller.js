const searchmodel = require("../models/searchmodel");
function search(req,res){
   
        searchmodel.searchstudent(req.body.name + "%",req.body.enrol + "%",req.body.reg+"%",req.body.branch,req.body.section,req.body.email,req.body.phone,req.body.insta,(err,row)=>{
            if(err){
            return res.send(err.message);
        }
        if(!row){
         
            return res.redirect("/search");
        }
        req.session.message = row;
       
        return res.redirect("/result");
    });
}
function login(req,res){
    const username = req.body.username;
    const pass = req.body.password;
    searchmodel.login(username,pass,(err,row)=>{
        if(err){
            res.send(err.message);
        };
        if(row){
            if(row.password===pass){
                req.session.user = {
                    id:row.id,
                    username:row.username,
                    role:row.role
                };
                if(row.role==="admin"||row.role==="owner"){
                    
                    res.redirect("/admin_dashboard");
                }
                else{
                   
                    res.redirect("/user_dashboard");
                }
            }
            else{
                
                req.session.message="username or password is invalid";
                res.redirect("/");
            }
        }
        else{
            
            req.session.message = "username or password is invalid";
            res.redirect("/");
        }
    });

}
function deleteuser(req,res){
    const name = req.body.name;
    const username = req.body.username;
    const role =  req.session.role;
    searchmodel.search(name,username,(err,row)=>{
        if(err){
            return res.send(err.message);
        }
        if(!row){
          
            req.session.message = `${role} NOT EXISTS`;
            if(role==="user"){
            return res.redirect("/delete/user");}
            else{
                return res.redirect("/delete/admin");
            }
        }
        if(row){
            searchmodel.deletestudent(row.id,(err)=>{
                if(err){
                    return res.send(err.message);
                }
                
                req.session.message = `${role} DELETED`;
                return res.redirect("/admin_dashboard");
            });
        }
    });
}
function adduser(req,res){
    const username = req.body.username;
    const pass =  req.body.password;
    const name = req.body.name;
    const role = req.session.role;
    
    searchmodel.adduser(name,username,pass,role,(err)=>{
        if(err){
            res.send(err.message);
        }
        else{
            req.session.message = `${role} ADDED`;
            
            return res.redirect("/admin_dashboard");
        }
    });

}

module.exports = {
    search,login,deleteuser,adduser
}