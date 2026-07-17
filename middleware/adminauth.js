function adminlogin(req,res,next){
    if(!req.session.user) return res.redirect("/")
    if(req.session.user.role!="admin" && req.session.user.role!="owner"){
       return res.status(403).send("Access Denied");
    }
    next();

}
module.exports = adminlogin;