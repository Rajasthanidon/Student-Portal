const pool = require("../database/connection")
function searchstudent(name,enrol,reg,branch,section,email,phone,insta,callback) {
    name = name?.trim();
    enrol = enrol?.trim();
    branch = branch?.trim();
    section = section?.trim();
    email = email?.trim();
    insta = insta?.trim();
    if(!name){
        name = "";
    }
    if(!enrol){
        enrol = "";
    }
    if(!reg){
        reg = "";
    }
    if(!branch){
        branch= ""
    }
    if(!section){
        section = ""
    }
    if(!email){
        email=""
    }
    if(!phone){
        phone="";
    }
    if(!insta){
        insta = "";
    }
    
    async function result(){
        
        try{
            console.log(name)
            const res = await pool.query(`SELECT * FROM students WHERE name ILIKE $1 || '%' AND enrollment_number ILIKE '%' || $2 || '%' AND
                registration_number ILIKE '%' || $3 || '%' AND branch ILIKE '%' || $4 || '%' AND section ILIKE $5 || '%' AND email ILIKE '%' || $6 || '%' AND phone_number ILIKE '%' || $7 || '%' AND instagram ILIKE '%' || $8 || '%' `,[name,enrol,reg,branch,section,email,phone,insta]);
            const row = res.rows;
            callback(null,row)
        }
        catch(err){
       console.log("errrrrr")
         callback(err,null)
     }}
     result();
;}
function login(username,password,callback){
   
    async function result(){
        try{
            const res = await pool.query(`SELECT * FROM users WHERE username = $1`,[username]);
            const row = res.rows[0];
            callback(null,row);}
        catch(err){
            callback(err,null);
        }
    }
result();
}
function search(name,username,callback){
    
    async function result(){
        
        try{
           
        const res = await pool.query(`SELECT * FROM users WHERE name = $1 AND username = $2`,[name,username]);
        const row = res.rows[0];
       
        callback(null,row);}
        catch(err){
            
            callback(err,null);
        }
    }
result();
};
function alldata(callback){
     async function result(){
        try{
        const res = await pool.query(`SELECT * FROM students`);
        const row = res.rows;
        callback(null,row);
    }
     catch(err){
        callback(err,null)
     }
}
result();
}
function adduser(name,username,password,role,callback){
    async function result(){
        try{await pool.query("INSERT INTO users (name,username,password,role) VALUES($1,$2,$3,$4)",[name,username,password,role]);
            callback(null);
        }
        catch(err){
            callback(err);
        }
    }
    result();

}
function add(name,enrol,reg,branch,section,phone,email,insta,address,callback){
    async function result(){
        let row = "";
        const conditions = [];
        const value =[];
        let i = 1;
        if(name?.trim()){
            conditions.push(`UPPER(name) = UPPER($${i})`);
            value.push(name);
            i++;
        }
        if(enrol?.trim()){
            conditions.push(`UPPER(enrollment_number) = UPPER($${i})`);
            value.push(enrol);
            i++;
        }
        if(reg?.toString().trim()){
            conditions.push(`UPPER(registration_number) = UPPER($${i})`);
            value.push(reg);
            i++;
        }
        if(phone?.trim()){
            conditions.push(`UPPER(phone_number) = UPPER($${i})`);
            value.push(phone);
            i++;
        }
        if(email?.trim()){
            conditions.push(`UPPER(email) = UPPER($${i})`);
            value.push(email);
            i++;
        }
        if(insta?.trim()){
            conditions.push(`UPPER(instagram) = UPPER($${i})`);
            value.push(insta);
            i++;
        }
        const query = ` SELECT * FROM students WHERE (${conditions.join(" OR ")}) `
        
        const res = await pool.query(query,value);
        if(!enrol) enrol = "Not Available";
        if(!reg) reg = "Not Available";
        if(!branch) branch = "Not Available";
        if(!section) section = "Not Available";
        if(!phone) phone = "Not Available";
        if(!email) email = "Not Available";
        if(!insta) insta = "Not Available";
        if(!address) address = "Not Available";
        if(res.rows.length===0){ const add = await pool.query(`INSERT INTO students(name,enrollment_number,registration_number,branch,section,phone_number,email,instagram,address) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[name,enrol,reg,branch,section,phone,email,insta,address],()=>{
            console.log(`name = ${name} | enrollment = ${enrol} | registration = ${reg} | Branch = ${branch} | Section = ${section} | Phone number = ${phone} | Email = ${email} | Instagram = ${insta} | Address = ${address}`);
            
        });
        row = "DATA ADDED SUCCESFULLY"
        callback(null,row);
    }
        if(res.rows.length>0){
        row = "USER EXISTS";
        callback(null,row)}

    }
    result();

}
module.exports = { 
    searchstudent,login,search,alldata,adduser,add,find
};