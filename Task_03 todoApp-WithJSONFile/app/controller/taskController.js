
const fileHandler = require("../handlers/JSONFileHandler");
const fileName = "models/tasksData.json";

class Task{
    static main = (req,res)=>{
        const tasks=fileHandler.readJsonData(fileName);
        res.render("mainPage", {
            pageTitle:"MyApp",tasks
        })
    }
   static add = (req,res)=>{
        res.render("addTask", {
            pageTitle:"Add Task"
        })
    }
    
    static addPost = (req,res)=>{
        const tasks = fileHandler.readJsonData(fileName);
        const newTask = {id: Date.now(), ...req.body ,status:"Inactive"};
        tasks.push(newTask);
        fileHandler.writeJsonData(fileName, tasks)
        res.redirect("/");
    }

    static delAll = (req,res)=>{
        fileHandler.writeJsonData(fileName,[]);
        res.redirect("/");
    }
    static del = (req,res)=>{
        const id= req.params.id;
        const tasks = fileHandler.readJsonData(fileName);
        const ind= tasks.findIndex(u=>u.id==id);
        tasks.splice(ind,1);
        fileHandler.writeJsonData(fileName,tasks);
        if(req.originalUrl.includes("search")){
            res.redirect("/");
        }
        else{
            res.redirect("/");
        }
        
    }

    static changeActiveStatus =(req,res)=>{
     const id = req.params.id;
     const tasks = fileHandler.readJsonData(fileName);
     const ind = tasks.findIndex(t=>t.id==id);
     if(tasks[ind].status == "Inactive"){
        tasks[ind].status = "Active";
     }
     else if(tasks[ind].status == "Active"){
        tasks[ind].status = "Inactive";
     }
     else{
        tasks[ind].status = "Completed!";
     }
     fileHandler.writeJsonData(fileName,tasks);
     res.redirect("/");
    }

    static completeStatus = (req,res)=>{
        const id = req.params.id;
     const tasks = fileHandler.readJsonData(fileName);
     const ind = tasks.findIndex(t=>t.id==id);
     tasks[ind].status = "Completed!";
     fileHandler.writeJsonData(fileName,tasks);
     res.redirect("/");
    }

    static single =  (req,res)=>{
        const id= req.params.id;
        const tasks = fileHandler.readJsonData(fileName);
        const singleTask = tasks.find(t=>t.id==id);

        res.render("singleTask", {
            pageTitle:"Single Data",singleTask})
    }

    static search = (req,res)=>{
        res.render("searchTasks",{
            pageTitle:"Search Page"
        })
    }
    static searchLogic = (req,res)=>{

        const tasks = fileHandler.readJsonData(fileName);
        if(!req.query.search){
           
            const results = [];
            res.render("searchTasks",{
                pageTitle:"Search Page",results
            })
        }
        else{
            const results = tasks.filter(t=>t.title.toLowerCase().includes(req.query.search.toLowerCase())
             || t.content.toLowerCase().includes(req.query.search.toLowerCase()));
            res.render("searchTasks",{
                pageTitle:"Search Page",results
            })
        }


    }
    static edit = (req,res)=>{
        const id= req.params.id;
        const tasks = fileHandler.readJsonData(fileName);
        const task = tasks.find(u=> u.id == id);
        res.render("editTask", {
            pageTitle:"Edit Data",task
        })
    }
    static editLogic = (req,res)=>{
        const id = req.params.id;

        const tasks = fileHandler.readJsonData(fileName);
        const index = tasks.findIndex(u=> u.id == id);
        const status = tasks[index].status;
        tasks[index] = {id, ...req.query,status};
        fileHandler.writeJsonData(fileName, tasks);
        res.redirect(`/singleTask/${id}`);
    }
}
module.exports = Task;