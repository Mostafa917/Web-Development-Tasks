const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const userShow = document.querySelector("#userShow");
const heads = ["name", "age","pnumber", "status"]


const writeToStorage = (data, key=`tasks`) => localStorage.setItem(key, JSON.stringify(data));
const readFromStorage = (key=`tasks`) =>JSON.parse(localStorage.getItem(key))

if(readFromStorage("users")=== null){

    writeToStorage([],"users");
}



const userObjCreator = (myForm)=>{
    const user = { id:Date.now() }
    heads.forEach( h => user[h] = myForm.elements[h].value )
    return user
}

const addUser = (user)=>{
    const allUsers = readFromStorage("users")
        allUsers.push(user)
        writeToStorage(allUsers, "users")
    
}

function CreateMyOwnElement(element, parent, txt = null, classes = null){


    const myElement = document.createElement(element);
    parent.appendChild(myElement);
    if(txt){

        myElement.textContent = txt;
    }
    if(classes){
         myElement.classList=classes;
    }
    return myElement
}


if(myForm){
    myForm.addEventListener("submit", function(e){
        e.preventDefault();
        const user = userObjCreator(myForm);
        addUser(user);
        window.location = "index.html";
    })  
}




function drawData(all = true, singleUser = null, editIndex = null){

const allUsers = readFromStorage("users");
    if(all == true){
        userWrap.innerHTML = "";
        allUsers.forEach((user,i)=>{
            
            const tr = CreateMyOwnElement("tr",userWrap);
            CreateMyOwnElement("td",tr,user.id);
            CreateMyOwnElement("td",tr,user.name);
            CreateMyOwnElement("td",tr,user.age);
            CreateMyOwnElement("td",tr,user.pnumber);
            
            if(i!= editIndex){
                CreateMyOwnElement("td",tr,user.status);   

            const td = CreateMyOwnElement("td",tr);
     
            const showButton = CreateMyOwnElement("button",td,"Show","mx-2 btn btn-primary");
            const editButton = CreateMyOwnElement("button",td,"Edit","mx-2 btn btn-warning");
            const deleteButton = CreateMyOwnElement("button",td,"Delete","mx-2 btn btn-danger");
            
            deleteButton.addEventListener("click",(e)=>{
                deleteData(allUsers,i);
                drawData();
            })
            showButton.addEventListener("click",(e)=>{
             window.location = "single.html";
             readFromStorage("index");
             writeToStorage(i,"index");
         })
            editButton.addEventListener("click",(e)=>{
                
                editData(i);
         })
            }
            else{
               const select =  CreateMyOwnElement("select",tr);   

               CreateMyOwnElement("option",select , "Active");
               CreateMyOwnElement("option",select , "Inactive");
               select.value = user.status;
                const td = CreateMyOwnElement("td",tr);
            
                const saveButton = CreateMyOwnElement("button",td,"Save Changes","mx-2 btn btn-warning");
                const cancelButton = CreateMyOwnElement("button",td,"Cancel","mx-2 btn btn-danger");
                
                saveButton.addEventListener("click",(e)=>{
                
                user.status = select.value;

                 writeToStorage(allUsers,"users");
                 drawData();
                })
                cancelButton.addEventListener("click",(e)=>{
                 drawData();
             })
            }

             })
    }
    else{
        userShow.innerHTML = "";
        const tr = CreateMyOwnElement("tr",userShow);
            CreateMyOwnElement("td",tr,singleUser.id);
            CreateMyOwnElement("td",tr,singleUser.name);
            CreateMyOwnElement("td",tr,singleUser.age);
            CreateMyOwnElement("td",tr,singleUser.pnumber);
            CreateMyOwnElement("td",tr,singleUser.status);
    }

}

if(userWrap){
   drawData();
}

if(userShow){
    
    const allUsers = readFromStorage("users");
    if(allUsers === null){
        writeToStorage([],"users");
    }
    else{
        showData(allUsers);
    }
    
}

function deleteData(list,i){

    list.splice(i,1);
    writeToStorage(list,"users");
}

function showData(data){
    const showIndex = readFromStorage("index");
    const user = data[showIndex];
    drawData(false,user);
}

function editData(ind){
    
    writeToStorage(ind,"index");
    drawData(true,null,ind);
    
}








