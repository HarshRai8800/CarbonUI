import jwt from "jsonwebtoken";

const isAuth = async(req,res,next)=>{
    try {
        let {token} = req.cookies;
        console.log("token:"+token1);
        if(!token){
            return res.status(400).json({message:"User does not have token"});
        }
        let verifyToken = await jwt.verify(token,process.env.JWT_SECRET);
            if(!verifyToken){
                return res.status(400).json({message:"User does not have valid token"});
            }
        console.log("userId: " +verifyToken.userId);
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        return res.status(500).json({message:"isAuth middleware error, "+error});
    }
}

export default isAuth;
