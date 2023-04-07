
const connectDb = require("../../models/dbConnect");
const ObjectId = require("mongodb").ObjectId


class Task{
    static main = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                const tasks=await db.collection("Tasks").find().toArray();
                res.render("mainPage", {
                    pageTitle:"MyApp",tasks
                })
            })
        }    
     catch(e){
           console.log("err");
            }
        
    }
   static add = (req,res)=>{
        res.render("addTask", {
            pageTitle:"Add Task"
        })
    }
    
    static addPost = async(req,res)=>{
       try{
        connectDb(async(db)=>{
           await db.collection("Tasks").insertOne({...req.body,status:"Inactive!"})
           res.redirect("/");
        })
    }

        catch(e){
       console.log("err");
        }

    }

    static delAll = async(req,res)=>{
        try{
            connectDb(async(db)=>{
               await db.collection("Tasks").remove();
               res.redirect("/");
            })
        }
    
            catch(e){
           console.log("err");
            }
    }
    static del = async(req,res)=>{
        try{
            connectDb(async(db) => 
                await db.collection("Tasks").deleteOne({_id: new ObjectId(req.params.id)}));
            res.redirect("/")
        }
        catch(e){
            res.send(e);
        }       
    }

    static changeActiveStatus =async(req,res)=>{
        try{
            connectDb(async(db)=>{
                const task= await db.collection("Tasks").findOne({_id: new ObjectId(req.params.id)});
                if(task.status == "Inactive!"){
                    await db.collection("Tasks").updateOne(task,{$set:{status:"Active!"}});    
                    res.redirect("/");
                 }
                 else if(task.status == "Active!"){
                    await db.collection("Tasks").updateOne(task,{$set:{status:"Inactive!"}}); 
                    res.redirect("/");
                 }
                 else{
                    await db.collection("Tasks").updateOne(task,{$set:{status:"Completed!"}});
                    res.redirect("/");
                 }

                })
        }
        catch(e){
            res.send(e)
        }


    }

    static completeStatus = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                const task= await db.collection("Tasks").findOne({_id: new ObjectId(req.params.id)});
                if(task.status!="Completed!"){
                    await db.collection("Tasks").updateOne(task,{$set:{status:"Completed!"}});    
                res.redirect("/");
                }
                else{
                    res.redirect("/");
                }

                })
        }
        catch(e){
            res.send(e)
        }
    
    }

    static single =  async(req,res)=>{
         try{
                connectDb(async(db)=>{
                    const singleTask = await db.collection("Tasks").findOne({_id: new ObjectId(req.params.id)});
                    res.render("singleTask", {
                        pageTitle:"Single Data",singleTask});
                    })
            }
            catch(e){
                res.send(e)
            }
    }

    static search = (req,res)=>{
        res.render("searchTasks",{
            pageTitle:"Search Page"
        })
    }
    //searchLogic using arrayFilter
   /* static searchLogic = async(req,res)=>{

        try{
            connectDb(async(db)=>{
                const tasks=await db.collection("Tasks").find().toArray();
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
            })
        }    
     catch(e){
           console.log("err");
            }
    }
    */
    

    //searchLogic using Regex
    static searchLogic = async(req,res)=>{

        try{
            connectDb(async(db)=>{
                if(!req.query.search){
           
                    const results = [];
                    res.render("searchTasks",{
                        pageTitle:"Search Page",results
                    })
                }
                else{
                    const results = await db.collection("Tasks").find({$or:[
                        {title: {$regex:req.query.search,$options:'i'} }, 
                        {content: {$regex: req.query.search,$options:'i' }}]}).toArray();

                    console.log(results);
                    res.render("searchTasks",{
                        pageTitle:"Search Page",results
                    })
                }
            })
        }    
     catch(e){
           console.log("err");
            }
    }
    static edit = async(req,res)=>{
        
        try{
            connectDb(async(db)=>{
                const task= await db.collection("Tasks").findOne({_id: new ObjectId(req.params.id)});
                res.render("editTask", {
                    pageTitle:"Edit Data",task
                })
                })
        }
        catch(e){
            res.send(e)
        }
    }
    static editLogic = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                const task= await db.collection("Tasks").findOne({_id: new ObjectId(req.params.id)});              
                    await db.collection("Tasks").updateOne(task,{$set:{...req.query,status:task.status}});  
                    res.redirect(`/singleTask/${task._id}`);
                })
        }
        catch(e){
            res.send(e)
        }
    }
}
module.exports = Task;