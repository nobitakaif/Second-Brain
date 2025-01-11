import { ReactElement } from "react"

interface ButtonProps{
    variant : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    text : string,
    startIcon? : ReactElement //here might be i png icon or i it can be optional
    onClick?:()=>void
}

const variantStyle={
    "primary":"bg-blue-600 text-white",
    "secondary":"bg-blue-300 text-blue-600"
}

const sizeStyle={
    "sm":"py-1 px-2",
    "md":"py-2 px-4",
    "lg":"px-4 py-2"
}
const defaultStyle ="rounded-md p-4 flex "

export const Button=(prop:ButtonProps)=>{
                            // variant[primary]="bg-blue-300"

    return <button className={` ${variantStyle[prop.variant]} ${defaultStyle} ${sizeStyle[prop.size]} `} >
            {prop.startIcon ? <div className="pr-2 pt-0.5 ">{prop.startIcon}</div>:null} {prop.text}
        </button>
}

<Button variant="primary" text="Add Content" size="md" startIcon={<></>}/>