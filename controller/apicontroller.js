const searchmodel = require("../models/searchmodel");
function getstudent(req,res){
    searchmodel.alldata((err,row)=>{
         if(err){
            return res.send(err.message);
        }
        if(!row){
            console.log("return to search");
            return res.redirect("/search");
        }
        req.session.message = row;
        console.log("search result found");
        return res.json(row);
    });
}
module.exports = {
    getstudent
}