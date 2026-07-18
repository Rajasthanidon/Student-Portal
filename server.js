const app = require("./app");
const createtables = require("./database/db")
const PORT = process.env.PORT || 3000;
async function start(){
    await createtables();
    app.listen(PORT,"0.0.0.0",()=>{
        console.log("server started on ${PORT}")
    });
}
start();
