
const mongoose=require('mongoose')

const commentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    videoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    },
    desc:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

module.exports=mongoose.model("Comment",commentSchema);