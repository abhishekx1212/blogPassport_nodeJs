const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://trigonx1212:12345@cluster0.lrwyy8v.mongodb.net/myUser');
// const db = mongoose.connection;
// db.on('connected',(err)=>{
//     if(!err){
//         console.log('database connected..');
//     }
// })

const db = async()=>{
    await mongoose.connect("mongodb+srv://trigonx1212:12345@cluster0.hmmr1zy.mongodb.net/blog2");
    console.log('database connected!!');
}


module.exports = { db };