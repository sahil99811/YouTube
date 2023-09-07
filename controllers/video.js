const video=require('../models/video')
const User=require('../models/user')
exports.addVideo=async (req,res,next)=>{
  try{
   const newVideo=new video({userId:req.User.id,...req.body});
   const savedVideo=await newVideo.save();
   await User.findByIdAndUpdate(
    {
      _id:req.User.id,
    },
    {
      $push: {
        videos: savedVideo._id,
      },
    },
    { new: true }
  )
   return res.status(200).json({
    success:true,
    message:"video uploaded successfully",
    savedVideo
   })
  }catch(error){
    return res.status(500).json({
        success:false,
        message:"video not uploaded something went wrong"
    })
  }
}

exports.updateVideo=async (req,res,next)=>{
  try{
   const Video=await video.findById(req.params.id);
   if(Video==null){
    return res.status(403).json({
        success:false,
        message:"video not found"
    })
   }
   if(req.User.id==Video.userId){
    const updatedUser=await video.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body,
        },
        {
          new:true  
        }
    )
    return res.status(200).json({
        success:true,
        message:"video is updated successfully"
       })
   }
   return res.status(403).json({
    success:false,
    message:"you can only update your video only"
   })
  }catch(error){
    return res.status(500).json({
        success:false,
        message:"something went wrong try again"
    })
  }
}

exports.deleteVideo=async (req,res,next)=>{
    try{
        const Video=await video.findById(req.params.id);
        if(Video==null){
         return res.status(403).json({
             success:false,
             message:"video not found"
         })
        }
        if(req.User.id==Video.userId){
         const updatedUser=await video.findByIdAndDelete(
             req.params.id
         )
         await User.findByIdAndUpdate(
          {
            _id:req.User.id,
          },
          {
            $pull: {
              videos:req.params.id,
            },
          },
          { new: true }
         )
         return res.status(200).json({
            success:true,
            message:"video is deleted successfully"
           })
        }
        return res.status(400).json({
         success:false,
         message:"you can delete only your video"
        })
       }catch(error){
         return res.status(500).json({
             success:false,
             message:"something went wrong try again"
         })
       }
}

exports.getVideo=async (req,res,next)=>{
 try{
   const Video=await video.findById(req.params.id).populate("userId").exec();
   console.log("printing video details:",Video)
   if(Video==null){
    return res.status(403).json({
      success:true,
      message:"invalid id video is not found"
     })
   }
   return res.status(200).json({
    success:true,
    message:"video is fetched successfully",
    Video
   })
 }catch(error){
    return res.status(403).json({
        success:false,
        message:"something went wrong try agin later",
        
    })
 }
}

exports.updateViews=async (req,res,next)=>{
    try{
        const Video=await video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1},},{
          new:true
         })
        return res.status(200).json({
         success:true,
         message:"view are added",
         Video
        })
      }catch(error){
         return res.status(403).json({
             success:false,
             message:"something went wrong try agin later",
             
         })
      }
}

exports.getTrendingVideos=async (req,res,next)=>{
    try{
        const Video=await video.find().sort({views:-1})
        return res.status(200).json({
         success:true,
         message:"successfully fetched",
         Video
        })
      }catch(error){
         return res.status(403).json({
             success:false,
             message:"something went wrong try agin later",
             
         })
      }
}

exports.subscribedChannelVideo=async (req,res,next)=>{
    // try{
    //     const user=await User.findById(req.User.id);
    //     const subscribedChannel=user.subscribedChannel;
    //     const list=await promise.all(
    //         subscribedChannel.map((channelId)=>{
    //             return Video.find({userId:channelId});
    //         })
    //     );
    //     return res.status(200).json({
    //      success:true,
    //      message:"successfully fetched",
    //      response:list.flat().sort((a,b)=>b.createdAt-a.createdAt)
    //     })
    //   }catch(error){
    //      return res.status(403).json({
    //          success:false,
    //          message:"something went wrong try agin later",
             
    //      })
    //   }
}

exports.randomVideos=async (req,res,next)=>{
  try{
    const Video=await video.aggregate([{$sample:{size:40}}]);
    return res.status(200).json({
        success:true,
        message:"video are fetched succesfully",
        Video
    })
  }catch(error){
   return res.status(403).json({
    success:false,
    message:"something went wrong"
   })
  }
}

exports.searchBytag=async (req,res,next)=>{
    const tag=req.query.tags;
    const tags=tag.split(",");
    console.log(tags);
    try{
      const Video=await video.find({tags:{$in:tags}}).limit(20);
      return res.status(200).json({
        success:true,
        message:"successfully fetched",
        Video
      })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"something went wrong try again later",
          })
    }
}

exports.searchByTitle=async (req,res,next)=>{
    const query=req.query.q
    console.log(query)
    try{
        const Video=await video.find({ title: { $regex: query, $options: "i" } }).limit(40);
        return res.status(200).json({
          success:true,
          message:"successfully fetched",
          Video
        })
      }catch(error){
          return res.status(400).json({
              success:false,
              message:"something went wrong try again later",
            })
      }
}