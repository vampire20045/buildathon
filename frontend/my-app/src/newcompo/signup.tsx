import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "./subcomponent/msgbox";
import { Heading } from "./subcomponent/Heading";
import { Anchor } from "./subcomponent/anchorcompo";
import { Subheading } from "./subcomponent/SubHeading";
import { InputAndLabel } from "./subcomponent/labelAndInput";
import { Quotebox } from "./subcomponent/quotebox";
import { Button } from "./subcomponent/button";


interface postInput{
    username: string
    email: string,
    password: string
}

export const Singup = () => {
        const navigate= useNavigate();
        const BACK_END_URL=  import.meta.env.BACK_END_URL;

        const [postInput, setpostInput]= useState<postInput>({
                username: " ",
                email: " ",
                password:" "
        })
        const [msg,setMsg]= useState("");
        const [ismsg, setismsg]= useState(false);

const debounce=<T extends (...args: any[])=>void>(func: T, delay: number)=>{
let timeoutId :  ReturnType<typeof setTimeout> | undefined;
const context= this;

return function(...args: Parameters<T>){
        if(timeoutId) clearTimeout(timeoutId);
        timeoutId= setTimeout(() => {
           func.apply( context, args)     
        }, delay);
}
}
const ReqSingup= async()=>{
       try {
        const Response= await axios.post(`${BACK_END_URL}/api/v1/user/signup`, postInput)

        const {token}= Response.data;
        if(!token){          
              setMsg(Response.data.msg);
                setismsg(true);
               setTimeout(()=>{
setismsg(false)
               }, 2000)            
        }else{
                localStorage.setItem('token', token);
                if(localStorage.getItem('token') ){
                        navigate('/BlogsFeed');
                }
        }
        
       } catch (error) {
        console.log(error);
        setismsg(true);
        setMsg("Try again!");
       }
}
const debounceReqSignup= useCallback(debounce(ReqSingup, 300), [postInput.email, postInput.password, postInput.username])

const handleSubmit=()=>{
        debounceReqSignup();
}
        return (
        
                <div className="grid lg:grid-cols-2 md:grid-cols-1 h-screen">
                          {ismsg && <Msgbox msg={msg}/>}
                        
                        <div className="bg-white flex items-center justify-center h-screen p-2 ">
                               
                                <div className="h-96 w-96 bg-gray-50 p-2 border border-gray-300 rounded-md lg:shadow-lg md:shadow-none ">
                                        <Heading heading={"Create An Account"} align={"center"} />
                                        <div className="flex items-start justify-center ">
                                                <Subheading heading={"Already have an Account?"} align={"center"} />
                                                <Anchor heading={"Login"} link={"/Signin"} />
                                        </div>
                                        <InputAndLabel heading={"Username"} placeholder={"enter your name"} onChange={(e)=>{
                                setpostInput(c=>({
                                        ...c,
                                        username:e.target.value
                                }))
                                        }} />
                                        <InputAndLabel heading={"email"} placeholder={"enter your email"} onChange={(e)=>{
                                                setpostInput(c=>({
                                                        ...c,
                                                        email: e.target.value
                                                }))
                                        }}/>
                                        <InputAndLabel heading={"password"} type="password" placeholder={"enter your password"} onChange={(e)=>{
                                                setpostInput(c=>({
                                                        ...c,
                                                        password: e.target.value
                                                }))
                                        }} />
                                        <div className=" w-full p-2 flex items-center justify-center"><Button onClick={handleSubmit} heading={"Singup"} />
                                        </div>
                                </div>
                        </div>
                        <div className="bg-gray-50 flex items-center justify-center  invisible lg:visible">
                                <Quotebox quote={"As we venture into the future, the integration of technology and daily life becomes increasingly apparent. Innovations are reshaping how we interact with the world around us, creating new opportunities and challenges."}
                                        heading={"Olover wild"} subheading={"cf- autn.com"} />
                        </div>
                </div>
        )
}