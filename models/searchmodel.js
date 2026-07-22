const pool = require("../database/connection")
function searchstudent(name,enrol,reg,branch,section,email,phone,insta,callback) {
    name = name?.trim();
    enrol = enrol?.trim();
    branch = branch?.trim();
    section = section?.trim();
    email = email?.trim();
    insta = insta?.trim();
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
            conditions.push(`registration_number = $${i}`);
            value.push(reg);
            i++;
        }
        if(phone?.toString().trim()){
            conditions.push(`phone_number = $${i}`);
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
        try{
            if(res.rows.length===0){ const add = await pool.query(`INSERT INTO students(name,enrollment_number,registration_number,branch,section,phone_number,email,instagram,address) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[name,enrol,reg,branch,section,phone,email,insta,address],()=>{
                console.log(`name = ${name} | enrollment = ${enrol} | registration = ${reg} | Branch = ${branch} | Section = ${section} | Phone number = ${phone} | Email = ${email} | Instagram = ${insta} | Address = ${address}`);
                callback(null,true);    
            });
        }
    }
    catch(err){
        callback(err,null);
        }
        try{
            if(res.rows.length!=0){
                callback(null,res.rows)
            }
        }
        catch(err){
            callback(err,null)
        }
    }

    result();

}
function find(name,enrol,reg,phone,email,insta,callback){
    const conditions = [];
    const value = [];
    let i = 1;
    if(name){
        conditions.push(`UPPER(name) ILIKE UPPER($${i})`)
        value.push(name)
        i++
    }
    if(enrol){
        conditions.push(`UPPER(enrollment_number) ILIKE UPPER($${i})`)
        value.push(enrol)
        i++;
    }
    if(reg){
        conditions.push(`registration_number = $${i}`)
        value.push(reg);
        i++;
    }
    if(phone){
        conditions.push(`phone_number = $${i}`)
        value.push(phone)
        i++
    }
    if(email){
        conditions.push(`UPPER(email) ILIKE UPPER($${i})`)
        value.push(email)
        i++
    }
    if(insta){
        conditions.push(`UPPPER(instagram) ILIKE UPPER($${i})`)
        value.push(insta)
        i++
    }
    const query = `SELECT * FROM students WHERE (${conditions.join(" OR ")})`

    async function result(){
        try{
            
            const res = await pool.query(query,value);
            if(res.rows.length===1){
            const row = res.rows[0]
            callback(null,row)}
            else{
                callback(null,null)
            }
            }
            catch(err)
            {
                console.log(`error: ${err.message}`)
                callback(err,null)
            }
        }
        result();
    }
function update(name,enrol,reg,section,branch,phone,email,insta,callback){
    find(name,enrol,reg,phone,email,insta,(err,row)=>{
        if(!row){
            return callback(err,null);
        }
        const conditions = []
        const value = []
        const updatecond = []
        let i =1;
        name = name || null;
        enrol = enrol || null;
        reg = reg || null;
        section = section ||null;
        branch = branch || null;
        phone = phone || null;
        email = email || null;
        insta = insta || null;
        if(row.name ==="Not Available" && name){
            updatecond.push(`name = COALESCE($${i},name)`)
            value.push(name)
            i++
        }
        if(row.enrollment_number === "Not Available" && enrol){
            updatecond.push(`enrollment_number = COALESCE($${i},enrollment_number)`)
            value.push(enrol)
            i++
        }
        if(row.registration_number === "Not Available" && reg){
            updatecond.push(`registration_number = COALESCE($${i},registration_number)`)
            value.push(reg)
            i++
        }
        if(row.section==="Not Available" && section){
            updatecond.push(`section = COALESCE($${i},section)`)
            value.push(section)
            i++
        }
        if(row.branch==="Not Available" && branch){
            updatecond.push(`branch = COALESCE($${i},branch)`)
            value.push(branch)
            i++
        }
        if(row.phone==="Not Available" && phone){
            updatecond.push(`phone_number = COALESCE($${i},phone_number)`)
            value.push(phone)
            i++
        }
        if(row.email==="Not Available" && email){
            updatecond.push(`email = COALESCE($${i},email)`)
            value.push(email)
            i++
        }
        if(row.instagram==="Not Available" && insta){
            updatecond.push(`instagram = COALESCE($${i},instagram)`)
            value.push(insta)
            i++
        } 
        if(enrol){
            conditions.push(`UPPER(enrollment_number) = UPPER($${i})`)
            value.push(enrol)
            i++
        }
        if(reg){
            conditions.push(`registration_number = $${i}`)
            value.push(reg)
            i++
        }
        if(phone){
            conditions.push(`phone_number = $${i}`)
            value.push(phone)
            i++
        }
        if(email){
            conditions.push(`UPPER(email) = UPPER($${i})`)
            value.push(email)
            i++
        }
        if(name){
            conditions.push(`UPPER(name) = UPPER($${i})`)
            value.push(name)
            i++
        }
        if(insta){
            conditions.push(`UPPER(instagram) = UPPER($${i})`)
            value.push(insta)
            i++
        }
        const query = `UPDATE students SET ${updatecond.join(", ")} WHERE ${conditions.join(" OR ")} RETURNING *`
        async function result(){
        try{
                const res = await pool.query(query,value,()=>{
                })
                console.log(`Updated data =  Name:${res.rows[0].name},Enrollment:${res.rows[0].enrollment_number},Registration:${res.rows[0].registration_number},Section:${res.rows[0].section},Branch:${res.rows[0].branch},Phone:${res.rows[0].phone_number},Email:${res.rows[0].email},Instagram:${res.rows[0].instagram}`)
                callback(null,true)
        }
        catch(err){ 
            callback(err,false)
        }}
             
        })
}
module.exports = { 
    searchstudent,login,search,alldata,adduser,add,update,find
};