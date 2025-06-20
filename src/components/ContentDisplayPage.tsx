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
    const { content } = location.state || {};

    const formattedDate = format(new Date(content.createdAt), "yyyy-MM-dd");

    return (
        <div className="bg-slate-100 min-h-screen px-2 custmd:px-4 pb-10">
            <NavLink to="/">
                <div className="pt-3 custmd:pt-5 pl-2 custmd:pl-4 hover:cursor-pointer">
                    <BackIcon />
                </div>
            </NavLink>

            <div className="flex flex-col items-start px-2 pt-16 max-w-4xl mx-auto">

                <p className="flex items-center font-bold font-mono text-lg sm:text-2xl w-full">
                    {content.title}
                    <span className="ml-2">{iconMap[content.type]}</span>
                </p>


                <p className="text-gray-500 text-sm sm:text-base mt-1">{formattedDate}</p>


                <div className="flex flex-wrap gap-2 mt-4 w-full">
                    {content.tags.map((tag: tags) => (
                        <Tag key={tag._id} id={tag._id} content={tag.tag} isClose={false} />
                    ))}
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <div className="w-full max-w-4xl px-2 sm:px-4 md:px-6">
                    <div
                        className="prose prose-sm sm:prose-base lg:prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: content.content }}
                    />
                </div>
            </div>
        </div>
    );
};