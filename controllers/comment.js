
const comment=require('../models/comment');
const Video=require("../models/video")
exports.addComment=async (req,res,next)=>{
    try{
      const userId=req.User.id;
      const {videoId,desc}=req.body;
      if(videoId==null||desc==null||userId==null){
        return res.status(403).json({
            success:false,
            mesage:"plz send all field"
        })
      }
      const commentResponse=await comment.create({
        userId:userId,
        videoId:videoId,
        desc:desc,
      })
      const videoResponse=await Video.findByIdAndUpdate(
          {
            _id:videoId,
          },
          {
            $push: {
              comment:commentResponse._id,
            },
          },
          { new: true }
      )
      return res.status(200).json({
        success:true,
        message:"comment created successfully",
        commentResponse,
        videoResponse
    })
    }catch(error){
        console.error(error);
        return res.status(403).json({
            success:false,
            message:"something went wrong try again later"
        })
    }
}

exports.deleteComment=async (req,res,next)=>{
    try{
            const commentId=req.params.id;
            if(commentId==null){
              return res.status(403).json({
                  success:false,
                  mesage:"require comment id"
              })
            }
            console.log(commentId);
            const commentObjectId=new Object(commentId)
            console.log(commentObjectId);
            const commentData=await comment.findByIdAndDelete(commentId);
            console.log(commentData);
           await Video.findByIdAndUpdate(
                {
                  _id:commentData.videoId,
                },
                {
                  $pull: {
                    comment:commentId,
                  },
                },
                { new: true }
            )
            return res.status(200).json({
                success:true,
                message:"comment deleted successfully"
            })
    }catch(error){
        console.error(error);
        return res.status(403).json({
            success:false,
            message:"something went wrong try again later"
        })
    }

}

exports.getComment=async (req,res,next)=>{
    try{
      const videoId=req.body.videoId;
      console.log(videoId);
      if(videoId==null){
        return res.status(403).json({
            success:false,
            message:"plz provide video id"
        })
      }
      const Comment=await comment.find({_id:videoId},'comment');
      return res.status(200).json({
        success:true,
        message:"successfully fetched",
        Comment
      })
    }catch(error){
        console.error(error);
        return res.status(403).json({
            success:false,
            message:"something went wrong try again later"
        })
    }
}