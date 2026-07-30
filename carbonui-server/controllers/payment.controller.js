



export const CreateOrder = async (req,res)=>{
    try {
        const {amount,aiCredits} = req.body
        if(!amount || !aiCredits){
            return res.status(400).json({message:"Invalid plan data"});
        }

        const  option = {
            amount:amount * 100,
            
        }
    } catch (error) {
        
    }
}