const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./database/users.db",(err)=> {
    if(err){
        console.log(err.message);
    }
    console.log("Database connected succesfully");
});
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    username TEXT,
    password TEXT,
    role TEXT);`);
    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ENROLLMENT_NUMBER TEXT,
        REGISTRATION_NUMBER TEXT,
        NAME TEXT,
        BRANCH TEXT,
        SECTION TEXT,
        EMAIL TEXT,
        PHONE_NUMBER TEXT,
        INSTAGRAM TEXT,
        LINKDIN TEXT
        )`)
module.exports = db;