import express from "express";
import dotenv from "dotenv";
import {connectDb} from "./configs/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import componentRouter from "./routes/component.route.js";
import paymentRouter from "./routes/payment.route.js";
dotenv.config();

const app = express();

app.use(cors({
    origin:"https://carbonui-client.onrender.com",
    credentials:true,
}))
app.use(express.json());
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.json("Hello from server");
})


app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/component",componentRouter);
app.use("/api/payment",paymentRouter);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`);
    connectDb();
})
