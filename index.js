const express=require("express");
const app=express();
const connect=require('./config/database');
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const videoRoutes=require("./routes/video");
const commentRoutes=require('./routes/comment');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const PORT=process.env.PORT;

app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

app.use("/api/v1",authRoutes)
app.use("/api/v1",userRoutes)
app.use("/api/v1",videoRoutes)
app.use("/api/v1",commentRoutes)
//connecting with db
connect.dbConnect();
app.listen(PORT,()=>{
    console.log(`server is started at ${PORT}`)
})