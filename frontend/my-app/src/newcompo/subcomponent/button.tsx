
interface ButtonProps{
    onClick?:()=>void,
    heading: string
}
export const Button=(props: ButtonProps)=>{
    return <div className="p-1">
        <button  className="bg-black w-32 h-8 rounded-md text-white" onClick={props.onClick}>{props.heading}</button>
    </div>
}