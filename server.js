const app = require("./app");
const createtables = require("./database/db")
async function start(){
    await createtables();
    app.listen(3000,()=>{
        console.log("server started")
    });
}
start();
