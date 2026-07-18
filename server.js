const app = require("./app");
const createtables = require("./database/db")
const PORT = process.env.PORT || 3000;
async function start(){
    await createtables();
    app.listen(PORT,()=>{
        console.log("server started")
    });
}
start();
