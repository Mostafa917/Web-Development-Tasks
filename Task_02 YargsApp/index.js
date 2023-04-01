const yargs = require("yargs");
const user = require("./modules/users");

//Add User command
yargs.command({

    command:"addUser",
    builder:{
    name:{demandOption : true},
    age:{demandOption: true},
    email:{demandOption: true},
    fileName:{demandOption: true}
    },
    handler:(argv)=>{
      user.addUser(argv);
    }
})

//show All Users command
yargs.command({
    command:"showAll",
    builder:{
        fileName:{demandOption: true},
        view:{demandOption: true}
    },
    handler:(argv)=>{
        user.showAll(argv);
    }
    
})

//show 1 User command
yargs.command({
    command:"showUser",
    builder:{
        id:{demandOption:true},
        fileName:{demandOption: true},

    },
    handler:(argv)=>{
        user.showUser(argv);
    }
    
})

//delete 1 user command
yargs.command({
    command:"deleteUser",
    builder:{
        id:{demandOption:true},
        fileName:{demandOption: true}

    },
    handler:(argv)=>{
        user.deleteUser(argv);
    }
    
})

//delete All users command
yargs.command({
    command:"deleteAllUsers",
    builder:{
        fileName:{demandOption: true}

    },
    handler:(argv)=>{
        user.deleteAllUsers(argv);
    }
    
})

//edit User command
yargs.command({
    command:"editUser",
    builder:{
        id:{demandOption:true},
        fileName:{demandOption: true}

    },
    handler:(argv)=>{
        user.editUser(argv);
    }
    
})


yargs.argv