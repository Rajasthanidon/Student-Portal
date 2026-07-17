function ownerlogin(req,res,next){
    if(!req.session.user){
        return res.redirect("/");
    }
    if(req.session.user.role!="owner"){
        return res.render("admin_dashboard",{update:true,msg:"ACCESS DENIED"});
    }
    next();
}
module.exports = ownerlogin;