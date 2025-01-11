import { MainContent } from "../component/MainContent";
import { Sidebar } from "../component/Siderbar";

export function Dashboard(){
    return <div className="flex">
    <Sidebar/>
    <MainContent/>
   </div>
}