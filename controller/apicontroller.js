const searchmodel = require("../models/searchmodel");
function getstudent(req,res){
    searchmodel.alldata((err,row)=>{
         if(err){
            return res.send(err.message);
        }
        if(!row){
            return res.redirect("/search");
        }
        req.session.message = row;
        return res.json(row);
    });
}
module.exports = {
    getstudent
}