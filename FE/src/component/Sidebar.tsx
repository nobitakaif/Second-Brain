import Brain from "./icon/Brain"
// import IconComponent from "./icon/Brain"

export function Sidebar(){
    return <div className="bg-red-300 h-screen w-80"> 
    <Logo />
    </div>
}

function Logo(){
    return <div className="flex items-center mt-8 ml-10 cursor-pointer">
        <Brain/>
        <h2 className="font-bold text-4xl">Brainly</h2>
    </div>
}