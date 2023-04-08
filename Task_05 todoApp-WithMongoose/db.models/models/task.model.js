const mongoose = require('mongoose');
const taskModel = mongoose.model("task",{
    title:{
        type:String,
        required: true,
        minLength:3,
        maxLength:15,
    },
    content:{
        type:String,
        required: true,
        minLength:3,
        maxLength:50,
    },
    date:{
        type:Date
    },
    status:{
        type:String,
         default:"Inactive!"
    }
})

module.exports = taskModel;