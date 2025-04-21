import { ChangeEvent,  } from "react"

interface InputAndLabelProps{
    heading:string,
    placeholder?: string,
    onChange?: (e:ChangeEvent<HTMLInputElement>)=>void,
    type?:string

}
export const InputAndLabel= (props: InputAndLabelProps)=>{
    return <div className="p-2 ">
        <div className="text-lg text-black font-sm ">
{props.heading}
        </div>
        <div className="p-1 ">
<input  type={props.type || "text"}  className="min-h-8 overflow-hidden scrollbar-hide contenteditable rounded-md text-center w-full shadow-lg " placeholder={props.placeholder} onChange={props.onChange}/>

        </div>
    </div>
}