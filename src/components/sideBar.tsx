import { DocumentIcon } from "../assets/documentIcon"
import { MainIcon } from "../assets/mainIcon"
import { TwitterIcon } from "../assets/twitterIcon"
import { YoutubeIcon } from "../assets/youtubeIcon"
import { SideBarItem } from "./sideBarItem"
import { NavLink } from "react-router-dom"
export const SideBar = () => {

    return <div className="w-72 h-screen border-r border-gray-200 fixed top-0 left-0">


        <div className="flex items-center py-6 px-4 gap-2">
            <MainIcon color={'text-purple-600'} />
            <NavLink to="/"><h1 className="font-bold text-xl hover:cursor-pointer">Second Brain</h1></NavLink>
        </div>

        <NavLink to="/tweets"><SideBarItem icon={<TwitterIcon size="6" />} text={"Tweets"} /> </NavLink>
        <NavLink to="/youtube"><SideBarItem icon={<YoutubeIcon size="6" />} text={"Youtube"} /></NavLink>
        <NavLink to="/documents"><SideBarItem icon={<DocumentIcon size="6" />} text={"Documents"} /></NavLink>
    </div>
}