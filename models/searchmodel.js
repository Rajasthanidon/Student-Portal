const pool = require("../database/connection")
function searchstudent(name,enrol,reg,branch,section,email,phone,insta,callback) {
    
    async function result(){
        
        try{
            const res = await pool.query(`SELECT * FROM students WHERE NAME LIKE $1 AND ENROLLMENT_NUMBER LIKE $2 OR REGISTRATION_NUMBER LIKE $3 AND BRANCH LIKE $4 AND SECTION LIKE $5 OR EMAIL LIKE $6 OR PHONE_NUMBER LIKE $7 OR INSTAGRAM LIKE $8`,[name,enrol,reg,branch,section,email,phone,insta]);
            const row = res.rows;
            callback(null,row)
        }
        catch(err){
       
         callback(err,row)
     }}
     result();
;}
function login(username,password,callback){
   
    async function result2(){
        try{
            const res = await pool.query(`SELECT * FROM users WHERE username = $1`,[username]);
            const row = res.rows[0];
            callback(null,row);}
        catch(err){
            callback(err,row);
        }
    }
result2();
}
function search(name,username,callback){
    
    async function result(){
        
        try{
           
        const res = await pool.query(`SELECT * FROM users WHERE name = $1 AND username = $2`,[name,username]);
        const row = res.rows[0];
       
        callback(null,row);}
        catch(err){
            
            callback(err,row);
        }
    }
result();
};
function deletestudent(id,callback){
async function result4(){
    try{
    const row = await pool.query(`DELETE FROM users WHERE id = $1`,[id]);
    callback(null);
}
    catch(err){
        callback(err);

    }
}
result4();
}
function alldata(callback){
     async function result5(){
        try{
        const rows = await pool.query(`SELECT * FROM Masters WHERE NAME LIKE $1 AND ENROLLMENT_NUMBER LIKE $2 OR REGISTRATION_NUMBER LIKE $3 AND BRANCH LIKE $4 AND SECTION LIKE $5 OR EMAIL LIKE $6 OR PHONE_NUMBER LIKE $7 OR INSTAGRAM LIKE $8`,[name,enrol,reg,branch,section,email,phone,insta]);
        callback(null,rows)
    }
     catch(err){
        callback(err,rows)
     }
}
result5();
}
function adduser(name,username,password,role,callback){
    async function result6(){
        try{await pool.query("INSERT INTO users (name,username,password,role) VALUES($1,$2,$3,$4)",[name,username,password,role]);
            callback(null);
        }
        catch(err){
            callback(err);
        }
    }
    result6();

}
module.exports = {
    searchstudent,login,search,deletestudent,alldata,adduser
};