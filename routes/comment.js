const express =require('express')
const router=express.Router();

const {addComment,deleteComment,getComment}=require('../controllers/comment');

const {auth}=require('../middlewares/auth')

router.post("/addcomment",auth,addComment);
router.delete("/deletecomment/:id",auth,deleteComment);
router.get("/getcomment",getComment);

module.exports=router;