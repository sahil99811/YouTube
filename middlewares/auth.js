const jwt=require("jsonwebtoken")
require('dotenv').config();
exports.auth=async (req,res,next)=>{
    try
    {
        const token=req.cookies.acess_token||req.body.token
        console.log(token);
        if(token==undefined){
            return res.status(401).json({
                success:false,
                message:"you are not aunthenticated"
            });
        }
        try {
			// Verifying the JWT using the secret key stored in environment variables
			const decode = await jwt.verify(token, process.env.JWT_SECRET);
			console.log(decode);
			// Storing the decoded JWT payload in the request object for further use
			req.User = decode;
		} catch (error) {
			// If JWT verification fails, return 401 Unauthorized response
			return res
				.status(401)
				.json({ success: false, message: "token is invalid" });
		}
    }catch(error){
        return res.status(401).json({
			success: false,
			message: `Something Went Wrong While Validating the Token`,
		});
    }
    next();
}