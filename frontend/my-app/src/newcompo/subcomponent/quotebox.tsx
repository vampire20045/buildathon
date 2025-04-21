import { Heading } from "./Heading"
import { Subheading } from "./SubHeading"
interface QuoteboxProps{
    heading: string,
    subheading: string
    quote: string
    
    
}
export const Quotebox=(props: QuoteboxProps)=>{
    return <div className="bg-white w-3/4 h-1/3 p-4  border border-gray-200 rounded-lg">
        {props.quote}
    <div className="p-1 ">
    <Heading heading={props.heading}/>
    <Subheading heading={props.subheading}/>
    </div>
    
    </div>
}