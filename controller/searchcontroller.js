const searchmodel = require("../models/searchmodel");
const path = require("path");
const xlsx = require("xlsx");
function search(req,res){
   
        searchmodel.searchstudent(req.body.name,req.body.enrol,req.body.reg,req.body.branch,req.body.section,req.body.email,req.body.phone,req.body.insta,(err,row)=>{
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
function importdata(req,res){
    async function result(){
        const workbook = xlsx.readFile(req.file.path);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = xlsx.utils.sheet_to_json(sheet);
        let userupdatecount = 0;
        let userfailedcount = 0;
        let useraddcount = 0;
        let useraddfailcount = 0;
        let userexists = false;
        for( const user of data){
             await searchmodel.update(user.name,user.enrollment_number,user.registration,user.section,user.branch,user.phone,user.email,user.instagram,(err,row)=>{
                if(row===true){
                    userupdatecount++;
                }
                else if(row===false){
                    userfailedcount++;
                }
                else if(row===null){
                    searchmodel.add(user.name,user.enrollment_number,user.registration,user.branch,user.section,user.phone,user.email,user.instagram,user.address,(err,row)=>{
                        if(row===true){
                            useraddcount++
                            userexists = false
                        }
                        else if(row===null){
                            console.log(err.message);
                            useraddfailcount++
                            userexists= false
                        }
                        else{ 
                            console.log("user already exist:- ")
                            row.forEach(user=>{
                            console.log(user.name);
                            console.log(user.section)
                            userexists =true;
                            })
                        }
                    })
                }
                })
            }
            req.session.message = `${userupdatecount} USER UPDATED,   ${userfailedcount} USER FAILED TO UPDATE,   ${useraddcount} USER ADDED,   ${useraddfailcount} USER FAIL TO ADD`;
            res.redirect("/import")
        
    }
result();
}
function add(req,res){
    searchmodel.add(req.body.name,req.body.enrol,req.body.reg,req.body.branch,req.body.section,req.body.phone,req.body.email,req.body.insta,req.body.address,(err,row)=>{
        req.session.message = row;
        res.redirect("/admin_dashboard");
    });

}

module.exports = {
    search,login,deleteuser,adduser,importdata,add
}