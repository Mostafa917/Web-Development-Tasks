const deal = require("./dealWithJson.js");
const validator = require('validator');
const userHeads = ["id","name","age","email"];

const createObj = (data)=>{
    const userData = {};
if(!validator.isEmail(data.email)){
  console.log("email is invalid! please enter a valid email!");
  return false;
}
else{
userHeads.forEach(h=>{

    if(h=="id"){
        userData[h] = Date.now();
    }
    else{
        userData[h] = data[h];
    }

})
 return userData;
}
}

// User Class Functions Implementation
class User{
    static addUser = (argv)=>{
        const userData = createObj(argv);
        const data = deal.readJsonData(argv.fileName);
        if(!userData){
            console.log("an error has occured during user creation!");
        }
        else{
            data.push(userData);
            deal.writeJsonData(argv.fileName,data)
            console.log(`user: ${JSON.stringify(userData,null,"\t")}${"\n\t"}-Has Been Added Successfully!`);
        }
        }
    static showAll = (argv)=>{
   const allUsers = deal.readJsonData(argv.fileName);
  if(!allUsers.length){
    console.log("no users yet");
    return;
  }
  else{
    if(argv.view == "default"){

        console.log(allUsers);
    }
    else if(argv.view =="listed"){
        allUsers.forEach((user,index)=>{
            console.log(`${index+1} - Name: ${user.name} - Age:${user.age} - Email:${user.email} - ID:${user.id}${"\n"}`);
           
               })
    }
    else{
        console.log("Please enter a valid View Option (default/listed)!")
        return;
    }

   
  }
        }
    static showUser = (argv)=>{

        const allUsers = deal.readJsonData(argv.fileName);
        if(!allUsers.length){
            console.log("no users yet");
    return;
        }
        else{
            const single= allUsers.find(u=>u.id==argv.id);
            if(!single){
            console.log("User not found");
            }
            else{
                console.log(single);
            }
        }
        
    }
    static deleteUser = (argv)=>{
        const allUsers=deal.readJsonData(argv.fileName);
        if(!allUsers.length){
            console.log("no users yet");
    return;
        }
        else{
            const single= allUsers.find(u=>u.id==argv.id);
            const index = allUsers.indexOf(single);
            if(!single){
            console.log("User not found");
            }
            else{
                allUsers.splice(index,1);
                deal.writeJsonData(argv.fileName,allUsers);
                console.log("User Deleted Successfully");
                console.log(single);
            }
        }
    }
    static deleteAllUsers = (argv)=>{
        const allUsers=deal.readJsonData(argv.fileName);
        if(!allUsers.length){
            console.log("no users yet");
             return;
        }
        else{
            allUsers.splice(0,allUsers.length);
            deal.writeJsonData(argv.fileName,allUsers);
            console.log("All Users have been Successfully Deleted");
        }
    }
    static editUser = (argv)=>{
        const allUsers=deal.readJsonData(argv.fileName);
        if(!allUsers.length){
            console.log("no users yet");
            return;
        }
        else{
            const single= allUsers.find(u=>u.id==argv.id);
            if(!single){
            console.log("User not found");
            }
            else{
                if(argv.name == null && argv.age == null && argv.email == null){
                    console.log("no Data has been Received to Edit the User Data"); 
                }
                else{
                    if(argv.name != null){
                        single.name = argv.name;

                    }
                    if(argv.age!=null){
                        single.age = argv.age;

                    }
                    if(argv.email!=null){
                        if(validator.isEmail(argv.email)){
                            single.email = argv.email;
                        }
                        else{
                            console.log("Email Entered is invalid!");
                        }
                    }
                    deal.writeJsonData(argv.fileName,allUsers);
                    console.log("User Has been Edited");
                    this.showUser(argv);
                }
                
            }
        }

    }

}

module.exports = User;