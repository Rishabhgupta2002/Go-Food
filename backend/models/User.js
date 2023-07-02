const moongoose=require("mongoose")
const {Schema}=moongoose;

const UserSchema=new Schema({
    name:{
        type:"string",
        required:true
    },
    location:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:true
    },
    password:{
        type:"string",
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});
module.exports=moongoose.model("user",UserSchema)