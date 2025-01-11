import Brain from "../icon/Brain"

export function Sidebar(){
    return <div className="h-screen bg-blue-400 w-80">
        <AppLogo/>
    </div>
}

function AppLogo(){
    return <div className=" flex m-6 items-center cursor-pointer">
        <Brain/>
        <h1 className="text-4xl font-serif">Brainly</h1>
    </div>
}

function SidebarItem(){
    return <div>
        
    </div>
}