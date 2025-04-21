interface MsgboxProps{
    msg: string
}

export const Msgbox=(props: MsgboxProps)=>{
    return <div className="fixed top-16 right-10 text-white rounded-md bg-black h-10 w-56 text-center p-2 border-1 shadow-lg transition ease-in-out ">
      {props.msg}
</div>
}