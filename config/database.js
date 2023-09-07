const mongoose=require('mongoose')
require("dotenv").config();
exports.dbConnect=()=>{
    mongoose.connect(process.env.MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then(()=>{
        console.log("Db connected successfully");
    })
    .catch((error)=>{
        console.log("Error while connecting with db");
        console.error(error);
    })
}