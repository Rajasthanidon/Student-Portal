const app = require("./app");
const createtables = require("./database/db")
const PORT = process.env.PORT || 5500;
async function start(){
    await createtables();
    app.listen(PORT,()=>{
        console.log(`server started on ${PORT}`)
    });
}
start();
    