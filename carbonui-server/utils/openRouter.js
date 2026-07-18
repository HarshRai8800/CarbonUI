import axios from "axios"

export const askAI = async(messages)=>{
    try{
        if(!messages||!Array.isArray(messages)||messages.length==0){
            throw new Error("Messages array is empty.")
        }

        const response = await axios.post("https://openrouter.ai/api/v1/chat/completions",{
            model:"deepseek/deepseek-chat",
            messages:messages,
            temperature:0.7,
            max_tokens:2000,
            response_format:{type:"json_object"}
        },{
            headers:{
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'X-OpenRouter-Title': 'CarbonUI',
                'Content-Type': 'application/json', 
            }
        })

        const content = response?.data?.choices?.[0]?.message?.content

        if(!content || !content.trim()){
            throw new Error("AI returned empty response");
        }

        return content;
    }
    catch(err){
        console.error("OpenRouter Error:",err.response?.data||err.message);
        throw new Error("OpenRouter API Error");
    }
}