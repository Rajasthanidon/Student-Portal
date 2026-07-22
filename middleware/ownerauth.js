function ownerlogin(req,res,next){
    if(!req.session.user){
        return res.redirect("/");
    }
    if(req.session.user.role!="owner"){
        return res.render("index",req.session.message = "Chla ja bosdike");
    }
    next();
}
module.exports = ownerlogin;