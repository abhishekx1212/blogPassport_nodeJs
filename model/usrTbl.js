const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true  
  },
  description:{
    type: String,
    required: true  
  },
  image:{
    type: String,
    required: true
  } 
})
const user = mongoose.model("blogData",userSchema);

const userSchema2 = new mongoose.Schema({
  name:{
    type: String,
    required: true  
  },
  password:{
    type: String,
    required: true  
  }  
})

const user2 = mongoose.model("userData",userSchema2);

module.exports = { user,user2 };