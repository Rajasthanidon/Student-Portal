const pool = require("./connection");
async function createtables() { 
    await pool.query(`CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT,
    username TEXT,
    password TEXT,
    role TEXT);`);
    await pool.query(`CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        ENROLLMENT_NUMBER TEXT,
        REGISTRATION_NUMBER TEXT,
        NAME TEXT,
        BRANCH TEXT,
        SECTION TEXT,
        EMAIL TEXT,
        PHONE_NUMBER TEXT,
        INSTAGRAM TEXT,
        ADDRESS TEXT,
        LINKDIN TEXT
        )`)
        console.log("Database connected succesfully");
}
module.exports = createtables;