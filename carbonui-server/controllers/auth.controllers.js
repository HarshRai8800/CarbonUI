import User from "../models/user.model.js";
import {genToken} from "../configs/token.js";

export const googleAuth = async(req,res)=>{
    try{
        const {name,email} = req.body;
        let user = await User.findOne({email});
        if(!user){
            user = await User.create({
                name,email
            })
        }
        let token = await genToken(user._id);
        
        res.cookie("token",token,{
            httpOnly : false,
            secure:true,
            sameSite:"none",
            maxAge:7*24*60*60*1000
        })

        console.log( "user:  "+user)

        return res.status(200).json(user);

    }catch(err){
        catch (err) {
        console.error("Google Auth Error:", err);

        return res.status(500).json({
        message: err.message
    });
} 
    }
}

export const logOut = async(req,res)=>{
    try{
        await res.clearCookie("token",{
            httpOnly:false,
            secure:true,
            sameSite:"none"
        })
        return res.status(200).json({message:"LogOut Successfully"});
    }catch(err){
        return res.status(500).json({message:`Failed to log out ${err}`});  
    }
}
