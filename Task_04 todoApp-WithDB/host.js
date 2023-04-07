const app = require("./app/source.js");
require("dotenv").config();

app.listen(process.env.PORT,()=>{

console.log(`You're on Port : ${process.env.PORT}`);

})