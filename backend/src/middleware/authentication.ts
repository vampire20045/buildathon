//@ts-ignore
import jwt from "jsonwebtoken";
const Sec="Aryan"
export const authentication=async(req:any,res:any,next:any)=>{
    const token=req.headers["authorization"];
    if(!token){
        return res.status(401).json({message:"Unauthorized"});}
        try{
            const t=token.split(" ")[1];
            const decode=jwt.verify(t,Sec);
            req.user=decode;
            next();
        }
        catch(err){
            return res.status(401).json({message:"Unauthorized"});
        }
    };
