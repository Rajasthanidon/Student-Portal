const db = require("../database/db");
function searchstudent(name,enrol,reg,branch,section,email,phone,insta,callback) {
    console.log("searchmodel");
     db.all(`SELECT * FROM Masters WHERE NAME LIKE ? AND ENROLLMENT_NUMBER LIKE ? OR REGISTRATION_NUMBER LIKE ? AND BRANCH LIKE ? AND SECTION LIKE ? OR EMAIL LIKE ? OR PHONE_NUMBER LIKE ? OR INSTAGRAM LIKE ?`,[name,enrol,reg,branch,section,email,phone,insta],(err,row)=>{
        callback(err,row);
        console.log("dbsearch");
     });

};
function login(username,password,callback){
    db.get(`SELECT * FROM users WHERE username = ?`,[username],(err,row)=>{
        callback(err,row);
    });
}
function search(name,username,callback){
    db.get(`SELECT * FROM users WHERE username = ? AND name = ?`,[username,name],(err,row)=>{
        callback(err,row);
    })

};
function deletestudent(id,callback){
db.run(`DELETE FROM users WHERE id = ?`,[id],(err)=>{
    callback(err);
});
}
function alldata(callback){
    db.all(`SELECT * FROM Masters WHERE SECTION = ?`,["J"],(err,row)=>{
        callback(err,row);
    });
}
module.exports = {
    searchstudent,login,search,deletestudent,alldata
};