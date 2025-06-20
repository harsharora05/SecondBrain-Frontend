import { DocumentIcon } from "../assets/documentIcon"
import { MainIcon } from "../assets/mainIcon"
import { TwitterIcon } from "../assets/twitterIcon"
import { YoutubeIcon } from "../assets/youtubeIcon"
import { SideBarItem } from "./sideBarItem"
import { NavLink } from "react-router-dom"
import { SideBarHeading } from "./sideBarHeading"
export const SideBar = () => {

    return <div className="group xl:w-72  w-16 hover:xs:w-50 hover:custmd:w-72  z-10 transition-all duration-300 bg-white h-screen border-r border-gray-200 fixed top-0 left-0">


        <NavLink to="/"><SideBarHeading text="Second Brain" icon={<MainIcon size="8 custmd:size-10" color="purple-600" />} /></NavLink>

        <NavLink to="/tweets"><SideBarItem icon={<TwitterIcon size="4 custmd:size-6" />} text={"Tweets"} /> </NavLink>
        <NavLink to="/youtube"><SideBarItem icon={<YoutubeIcon size="4 custmd:size-6" />} text={"Youtube"} /></NavLink>
        <NavLink to="/documents"><SideBarItem icon={<DocumentIcon size="4 custmd:size-6" />} text={"Documents"} /></NavLink>
    </div>
}