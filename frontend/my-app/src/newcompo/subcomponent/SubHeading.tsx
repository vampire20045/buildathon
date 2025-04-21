interface SubheadingProps{
    heading: string
    align?: string
    hoverColor?: string
}
export const Subheading=(props: SubheadingProps)=>{
    return (
<div className={`text-sm text-${props.align} pl-1 text-gray-500 hover:text-${props.hoverColor}-600`}>
    {props.heading}
</div>
    )
}