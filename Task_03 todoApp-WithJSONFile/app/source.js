const express = require("express");
const app = express();
const hbs = require("hbs");

//frontEndDirPaths
const path = require("path");
const styleDir= path.join(__dirname,"../content/style");
const viewsDir= path.join(__dirname,"../content/views");
const sharedDir= path.join(__dirname,"../content/sharedViewContent");
//frontEndDirPaths


//app path config
app.use(express.static(styleDir));
app.set("view engine","hbs");
app.set("views",viewsDir);
hbs.registerPartials(sharedDir);
app.use(express.urlencoded({extended:true}));
//app path config


//routing
const taskRoutes = require("./routes/task.routes");
app.use(taskRoutes);
//routing

//errorPage
app.all("*",(req,res)=>{
    res.render("errorPage",{pageTitle:"error Page"});
})
//errorPage

module.exports = app;