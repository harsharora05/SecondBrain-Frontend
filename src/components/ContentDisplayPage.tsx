import { format } from "date-fns";
import { useLocation } from "react-router-dom"
import { Tag } from "./tag";
import { BackIcon } from "../assets/backIcon";
import { NavLink } from "react-router-dom";
import { DocumentIcon } from "../assets/documentIcon";
import { type ReactElement } from "react";
import { YoutubeIcon } from "../assets/youtubeIcon";
import { TwitterIcon } from "../assets/twitterIcon";
import type { tags } from "../Types/contentType";


const iconMap: Record<string, ReactElement> = {
    "document": <DocumentIcon size="6" />,
    "youtube": <YoutubeIcon size="6" />,
    "tweet": <TwitterIcon size="6" />
};


export const ContentPage = () => {

    const location = useLocation();
    const { content } = location.state || {}


    const formattedDate = format(new Date(content.createdAt), "yyyy-MM-dd");



    return <div className="bg-slate-100 min-h-screen">
        {<NavLink to="/"><div className="absolute pt-5 pl-10 hover:cursor-pointer">
            <BackIcon />
        </div></NavLink>}

        <div className=" flex items-center flex-col pt-20 px-10 pb-10">
            <p className="flex items-center font-bold font-mono text-2xl w-238">
                {content.title}
                <span className="ml-2">{iconMap[content.type]}</span>
            </p>
            <p className="w-238 text-gray-500">{formattedDate}</p>

            <div className="flex gap-3 w-238 mt-5">
                {content.tags.map((tag: tags) => <Tag key={tag._id} id={tag._id} content={tag.tag} isClose={false} />)}
            </div>

        </div >

        <div className="w-screen flex justify-center">
            <div className="w-250 p-5">
                <div dangerouslySetInnerHTML={{ __html: content.content }}>
                </div>
            </div>
        </div>

    </div >
}