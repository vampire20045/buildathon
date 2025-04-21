import { Link } from "react-router-dom"
import { Subheading } from "./SubHeading"
interface AnchorProps{
link: string,
heading: string,


}
export const Anchor=(props: AnchorProps)=>{

    return <div className={`underline hover:text-blue-600 hover:font-medium`}>
       <Link to={props.link}><Subheading hoverColor={"blue"} heading={props.heading} /></Link>
    </div>
}