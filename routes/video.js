const express =require('express')
const router=express.Router();

const {auth}=require('../middlewares/auth');
const {addVideo,deleteVideo,updateVideo,getVideo,searchByTitle,searchBytag,getTrendingVideos,randomVideos,subscribedChannelVideo,updateViews}=require('../controllers/video');
router.post("/video",auth,addVideo);
router.delete("/:id",auth,deleteVideo);
router.put("/:id",auth,updateVideo);
router.get("/find/:id",auth,getVideo);
router.put("/view/:id",updateViews);
router.get("/trending",getTrendingVideos);
// router.get("/subscription",auth,subscribedChannelVideo);
router.get("/tags",searchBytag);
router.get("/search",searchByTitle);
router.get("/randomVideos",randomVideos);
module.exports=router