import axios from "axios";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Msgbox } from "./subcomponent/msgbox";
import { Heading } from "./subcomponent/Heading";
import { Anchor } from "./subcomponent/anchorcompo";
import { InputAndLabel } from "./subcomponent/labelAndInput";
import { Button } from "./subcomponent/button";
import { Subheading } from "./subcomponent/SubHeading";


interface PostInput {
    email: string;
    password: string;
  }

  
export const  Singin=()=>{
    const BACK_END_URL=  import.meta.env.BACK_END_URL;

    const navigate= useNavigate();
    const [fadeOut, setFadeOut] = useState(false);
    const [postInput,setpostinput]=useState<PostInput>({
        email: " ",
        password: " "
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
    const ReqSingin= async()=>{
        try {
         const Response= await axios.post(`${BACK_END_URL}/api/v1/user/Login`, postInput)
 
         const {userToken}= Response.data;
         if(!userToken){          
               setMsg(Response.data.msg);
                 setismsg(true);
                setTimeout(()=>{
 setismsg(false)
                }, 1000)            
         }else{
            setFadeOut(true);
                 localStorage.setItem('token', userToken);
                 
                 navigate("/BlogsFeed")
         }
         
        } catch (error) {
            console.log(error);
         setismsg(true);
         setMsg("Try again!");
        }
 }
 const debounceReqSignin= useCallback(debounce(ReqSingin, 300), [postInput.email, postInput.password])

 const handleSubmit=()=>{
         debounceReqSignin();
 }
    return (
       
 <div className="flex items-center justify-center h-screen "> 
                           {ismsg && <Msgbox msg={msg}/>}

 <div className="w-full">
                  <div className={`bg-white flex items-center justify-center transition-all duration-500 ${fadeOut ? 'fade-out' : ''}`}>
<div className="h-80 w-96 bg-gray-50 p-2 border border-gray-200 rounded-md shadow-lg">
<Heading heading={"Login To Account"} align={"center"} />
<div className="flex items-center justify-center">
<Subheading heading={"Don't have an Account?"} align={"center"} />
<Anchor heading={"Singup"} link={"/Singup"}/>
</div>
<InputAndLabel heading={"email"} placeholder={"enter your email"}  onChange={(e)=>{
    setpostinput(c=>({
        ...c,
        email: e.target.value
    }))
}}/>
<InputAndLabel heading={"password"} type="password" placeholder={"enter your password"} onChange={(e)=>{
    setpostinput(c=>({
        ...c,
        password: e.target.value
    }))
}} />
<div className=" w-full p-2 flex items-center justify-center"><Button heading={"Singup"} onClick={handleSubmit} />
</div>
</div>
</div> 
       </div>
 </div>
    )

}