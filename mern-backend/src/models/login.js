const mongoose = require("mongoose");

const employeeschema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    confirmpassword :{
        type:String,
        required:true
    }
})


//now we have to create a collections

const  Register = new mongoose.model("Register", employeeschema);
module.exports = Register;