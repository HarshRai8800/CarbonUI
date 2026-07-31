import User from "../models/user.model.js";

export const getCurrentUser = async(req,res)=>{
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.status(404).json({message:"Failed to get Current User"});
        }
        console.log(user)
        return res.status(200).json({user});

    } catch (error) {
        return res.status(500).json({message:"Current User server error ", error});
    }
}

export const getAllUsers = async(req,res)=>{
    try {
        const users = await User.find().sort({createdAt:-1})
        if(!users){
            return res.status(404).json({message:"Users are not found"});
        }

        console.log(users)

        return res.status(200).json(users);
    } catch (error) {
        console.log(error.message)
        return res.status(500)
        .json({message:`Failed to get all users ${error}`});
    }
}
