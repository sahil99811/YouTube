const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    subscriber:{
        type:Number,
        default:0
    },
    subscribedChannel:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Video"
        }
    ]
},{
    timestamps:true
}
)

module.exports=mongoose.model("User",userSchema);