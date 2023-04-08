
const taskModel = require("../../db.models/models/task.model");

class Task{
    static main = async(req,res)=>{
        try{
            const tasks = await taskModel.find();
            res.render("mainPage", {
                pageTitle:"MyApp",tasks
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
        const data = new taskModel(req.body);
        await data.save();
        res.redirect("/");
    }

        catch(e){
       console.log("err");
        }

    }

    static delAll = async(req,res)=>{
        try{
            await taskModel.deleteMany();
               res.redirect("/");
        }
    
            catch(e){
           console.log("err");
            }
    }
    static del = async(req,res)=>{
        try{
            await taskModel.findOneAndRemove(req.params.id);
            res.redirect("/");
          
        }
        catch(e){
            res.send(e);
        }       
    }

    static changeActiveStatus =async(req,res)=>{
        try{
            
                const task= await taskModel.findById(req.params.id);
                if(task.status == "Inactive!"){
                    await taskModel.findByIdAndUpdate(req.params.id,{$set:{status:"Active!"}})  
                    res.redirect("/");
                 }
                 else if(task.status == "Active!"){
                    await taskModel.findByIdAndUpdate(req.params.id,{$set:{status:"Inactive!"}})  
                    res.redirect("/");
                 }
                 else{
                    await taskModel.findByIdAndUpdate(req.params.id,{$set:{status:"Completed!"}}) 
                    res.redirect("/");
                 }

        }
        catch(e){
            res.send(e)
        }


    }

    static completeStatus = async(req,res)=>{
        try{
                const task= await taskModel.findById(req.params.id);
                if(task.status!="Completed!"){
                await taskModel.findByIdAndUpdate(req.params.id,{$set:{status:"Completed!"}})    
                res.redirect("/");
                }
                else{
                    res.redirect("/");
                }

        }
        catch(e){
            res.send(e)
        }
    
    }

    static single =  async(req,res)=>{
         try{
                const singleTask = await taskModel.findById(req.params.id);
                    res.render("singleTask", {
                        pageTitle:"Single Data",singleTask});
                    
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
    
    static searchLogic = async(req,res)=>{
        try{
            if(!req.query.search){
           
                 const results = [];
                 res.render("searchTasks",{
                 pageTitle:"Search Page",results
                    })
                }
                else{
                    const results = await taskModel.find({$or:[
                        {title: {$regex:req.query.search,$options:'i'} }, 
                        {content: {$regex: req.query.search,$options:'i' }}]});

                    console.log(results);
                    res.render("searchTasks",{
                        pageTitle:"Search Page",results
                    })
                }
          
        }    
     catch(e){
           console.log("err");
            }
    }
    static edit = async(req,res)=>{
        
        try{
                const task= await taskModel.findById(req.params.id);
                res.render("editTask", {
                    pageTitle:"Edit Data",task
                })
                
        }
        catch(e){
            res.send(e)
        }
    }
    static editLogic = async(req,res)=>{
        try{
                const task= await taskModel.findById(req.params.id);
                 await taskModel.findByIdAndUpdate(task,{$set:{...req.query,status:task.status}});  
                 res.redirect(`/singleTask/${task._id}`);
                
        }
        catch(e){
            res.send(e)
        }
    }
}
module.exports = Task;