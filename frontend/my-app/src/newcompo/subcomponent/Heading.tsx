interface propsType{
    heading:string
    align?: string
}
export const Heading=(props:propsType)=>{
    return (
        <div className={`text-xl text-${props.align} p-1 text-black font-medium`}>
            {props.heading}
        </div>
    )
}