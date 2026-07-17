const searchmodel = require("../models/searchmodel");
function search(req,res){
        searchmodel.searchstudent(req.body.name + "%",req.body.enrol + "%",req.body.reg+"%",req.body.branch,req.body.section,req.body.email,req.body.phone,req.body.insta,(err,row)=>{
            if(err){
            return res.send(err.message);
        }
        if(!row){
            console.log("return to search");
            return res.redirect("/search");
        }
        req.session.message = row;
        console.log("search result found");
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
                    console.log("admin logged in");
                    res.redirect("/admin_dashboard");
                }
                else{
                    console.log("user logged in");
                    res.redirect("/user_dashboard");
                }
            }
            else{
                console.log("incorrect");
                req.session.message="username or password is invalid";
                res.redirect("/");
            }
        }
        else{
            console.log("invalid row");
            req.session.message = "username or password is invalid";
            res.redirect("/");
        }
    });

}
function deleteuser(req,res){
    const name = req.body.name;
    const username = req.body.username;
    searchmodel.search(name,username,(err,row)=>{
        if(err){
            return res.send(err.message);
        }
        if(!row){
            console.log("wrong user");
            req.session.message = "USER NOT EXISTS";
            return res.redirect("/delete/user");
        }
        if(row){
            searchmodel.deletestudent(row.id,(err)=>{
                if(err){
                    return res.send(err.message);
                }
                console.log("user deleted");
                req.session.message = "USER DELETED";
                return res.redirect("/admin_dashboard");
            });
        }
    });
}
module.exports = {
    search,login,deleteuser
}