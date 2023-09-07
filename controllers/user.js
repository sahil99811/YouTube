const User=require('../models/user')
const Video=require('../models/video')
exports.update=async (req,res,next)=>{
   if(req.params.id==req.User.id){
    try
    {
      const updateUser=await User.findByIdAndUpdate(req.params.id,{
         $set:req.body
      },{
         new:true
      }) 
    return res.status(200).json({
        success:true,
        message:"user updated succesfully",
        updateUser:updateUser
    })
    }catch(error){
       return res.status(403).json({
         message:false,
         message:"user is not updated"
       })
    }
   }
   return res.status(403).json({
    success:false,
    message:"you can update only your account"
   })
}

exports.deleteUser=async (req,res)=>{
    if(req.params.id==req.User.id){
        try
        {
          const updateUser=await User.findByIdAndDelete(req.params.id,) 
        return res.status(200).json({
            success:true,
            message:"user deleted succesfully"
        })
        }catch(error){
           return res.status(403).json({
             message:false,
             message:"user is not deleted",
             error:error
           })
        }
       }
       return res.status(403).json({
        success:false,
        message:"you can delete only your account"
       })
}

exports.getUser=async (req,res)=>{
 try
 {
    const user= await User.findById(req.params.id)
    return res.status(200).json({
        success:true,
        message:"user get successfully",
        user
    })
 }catch(error){
  res.status(403).json({
    success:false,
    message:"something went wrong",
  })
 }
}

exports.like=async (req,res)=>{
    const id=req.User.id;
    const videoId=req.params.id
    console.log(videoId)
    try{
     await Video.findByIdAndUpdate({_id:videoId},{
        $push:{likes:id},
        $pull:{dislikes:id}
     })
     return res.status(200).json({
        success:true,
        message:"video has been successfully liked"
     })
    }catch(error){
         return res.status(403).json({
            success:true,
            message:"something went wrong plz try again"
         })
    }
}

exports.dislike=async (req,res)=>{
    const id=req.User.id;
    const videoId=req.params.id
    try{
     await Video.findByIdAndUpdate(videoId,{
        $push:{dislikes:id},
        $pull:{likes:id}
     })
     return res.status(200).json({
        success:true,
        message:"video has been successfully disliked"
     })
    }catch(error){
         return res.status(403).json({
            success:true,
            message:"something went wrong plz try again"
         })
    }
}

exports.subscribe=async (req,res)=>{
    try
    {  
        await User.findByIdAndUpdate(req.User.id,{
        $push:{subscribedChannel:req.params.id}
       })
       const result=await User.findByIdAndUpdate(req.params.id,{
         $inc:{
            subscriber:1
         }
       },{
         new:true
       });
       return res.status(200).json({
           success:true,
           message:"subscribed channell successfully"
       })
    }catch(error){
     res.status(403).json({
       success:false,
       message:"something went wrong",
     })
    }
}

exports.unsubscribe=async (req,res)=>{
    try
    {
        await User.findByIdAndUpdate(req.User.id,{
        $pull:{subscribedChannel:req.params.id}
       })
       const result=await User.findByIdAndUpdate(req.params.id,{
         $inc:{
            subscriber:-1
         }
       },{
         new:true
       });
       return res.status(200).json({
           success:true,
           message:"unsubscribed channell successfully",
       })
    }catch(error){
     res.status(403).json({
       success:false,
       message:"something went wrong",
     })
    }
}