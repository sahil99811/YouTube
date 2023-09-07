const express =require('express')
const router=express.Router();
const {auth}=require('../middlewares/auth')
const {update,deleteUser,getUser,like,dislike,subscribe,unsubscribe}=require('../controllers/user');

//update user
router.put("/update/:id",auth,update)
//delete user
router.delete("/delete/:id",auth,deleteUser)
//get a user
router.get("/find/:id",auth,getUser)
//subscribe user
router.put("/sub/:id",auth,subscribe)
//unscriber user
router.put("/unsub/:id",auth,unsubscribe)
//like a video
router.put("/like/:id",auth,like)
//unlike a video
router.put("/dislike/:id",auth,dislike)
module.exports=router