const pool = require("../database/connection")
function searchstudent(name,enrol,reg,branch,section,email,phone,insta,callback) {
    
    async function result(){
        
        try{
            console.log(name)
            const res = await pool.query(`SELECT * FROM students WHERE name ILIKE $1 || '%' AND enrollment_number ILIKE '%' || $2 || '%' AND
                registration_number ILIKE '%' || $3 || '%' AND branch ILIKE '%' || $4 || '%' AND section ILIKE $5 || '%' AND email ILIKE '%' || $6 || '%' AND phone_number ILIKE '%' || $7 || '%' AND instagram ILIKE '%' || $8 || '%' `,[name,enrol,reg,branch,section,email,phone,insta]);
            const row = res.rows;
            console.log(row)
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
function deletestudent(id,callback){
async function result(){
    try{
    const row = await pool.query(`DELETE FROM users WHERE id = $1`,[id]);
    callback(null);
}
    catch(err){
        callback(err);

    }
}
result();
}
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
function importdata(enrol,phone,callback){

}
function searchenrol(enrol,callback){
    async function result(){
        try{
        const res = await pool.query(`SELECT * FROM students WHERE enrollment_number = $1`,[enrol]);
        const row = res.rows[0];
        callback(null,row);}
        catch(err){
            callback(err,null);
        }
    }
    result();
}
function searchreg(reg,callback){
    async function result(){
        try{
            const res = await pool.query(`SELECT * FROM students WHERE registration_number = $1`,[reg]);
            const row = res.rows[0];
            callback(null,row);
        }
        catch(err){
            callback(err,null);
        }
    }
    result();
}

function searchname(name,callback){
    async function result(){
        try{
            const res = await pool.query(`SELECT * FROM students WHERE name = $1`,[name]);
            const temp = res.rows;
            if(!temp[0]) return callback(null,null);
            if(temp.length>1){
                console.log("duplicate data found");
                temp.forEach(user=>{
                    console.log(user);
                })
                callback(null,null)
                return;
            }
            const row = temp[0]
            // console.log("OUTDATED ROW = ")
            // console.log(row)
            callback(null,row);
        }
        catch(err){
            callback(err,null)
        }
    }
    result();
}
function updatedata(name,enrol,reg,phone,email,callback){
async function result(){
    const res = await pool.query(`UPDATE students SET phone_number = COALESCE($1,phone_number),email = COALESCE($2,email),registration_number = COALESCE($3,registration_number),enrollment_number = COALESCE($4,enrollment_number) WHERE (enrollment_number = $5 OR registration_number = $6 OR name = $7) RETURNING *`,[phone,email,reg,enrol,enrol,reg,name]);
    if(enrol){
        console.log(`Enroll = ${enrol}`)
    }
    if(name){
        console.log(`Name = ${name}`)    
    }
    if(reg){  
        console.log(`Registration = ${reg}`)
    }
    if(phone){
        console.log(`Phone number = ${phone}`)
    }
    if(email){
        console.log(`Email = ${email}`)
    }
    console.log("Updated row = ")
    console.log(res.rows[0])
    console.log(res.rowCount)
    console.log( "row updated")
    callback(null,null)
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
        if(reg?.trim()){
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
        console.log(res.rows)
        console.log(res.rows.length)
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
    searchstudent,login,search,deletestudent,alldata,adduser,importdata,updatedata,searchenrol,searchreg,searchname,add
};