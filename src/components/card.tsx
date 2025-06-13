import { DocumentIcon } from "../assets/documentIcon";
import { TwitterIcon } from "../assets/twitterIcon";
import { DeleteIcon } from "../assets/deleteIcon";
import { ShareIcon } from "../assets/shareIcon";
import { YoutubeIcon } from "../assets/youtubeIcon";
import { type ReactElement } from "react";
import { useContentStore } from "../state/contentState";
import axios from "axios";
import { format } from "date-fns"
import { NavLink } from "react-router-dom";
import type { ContentType } from "../Types/contentType";
import { useShareContentModal, useShareModal } from "../state/shareState";
import { toast } from "react-toastify";






const iconMap: Record<string, ReactElement> = {
    "document": <DocumentIcon size="6" />,
    "youtube": <YoutubeIcon size="6" />,
    "tweet": <TwitterIcon size="6" />
}

export const Card = (props: ContentType) => {
    const removeContent = useContentStore((state) => state.removeContent)
    const deleteCard = async (id: string) => {
        const response = await axios.delete(`http://localhost:3000/api/v1/content/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });
        if (response.status == 200) {
            console.log(response.data.message);
            toast.success(response.data.message);
            removeContent(id);
        }


    }

    const htmlToText = (html: string) => {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    };

    const trunContent = htmlToText(props.content).substring(0, 200) + "...";
    const date = format(new Date(props.createdAt), "yyyy-MM-dd");

    const data = {
        "content": props.content,
        "tags": props.tags,
        "title": props.title,
        "createdAt": props.createdAt,
        "type": props.type,
        "_id": props._id
    }


    const toggleShareModal = useShareModal((state) => state.toggleShareModal)
    const setId = useShareContentModal((state) => state.setId);


    return <div className="border border-gray-200 h-85 w-70 rounded-lg relative bg-white hover:cursor-pointer">
        <div className="flex items-center justify-between py-2 text-base px-3">

            <NavLink to={`/content/${props._id}`} state={{ "content": data }}>
                <div className="flex items-center gap-2">
                    {iconMap[props.type]}
                    <span className="text-lg w-40 overflow-hidden text-ellipsis">{props.title} </span>
                </div>
            </NavLink>
            <div className="flex items-center gap-2">
                <div className="hover:cursor-pointer" onClick={() => {
                    toggleShareModal();
                    setId(props._id);
                }} ><ShareIcon /></div>
                <div className="hover:cursor-pointer" onClick={() => deleteCard(props._id)}><DeleteIcon /></div>
            </div>
        </div>

        <NavLink to={`/content/${props._id}`} state={{ "content": data }}>
            <div className="flex justify-center px-4 py-5 h-65 break-words overflow-hidden" >
                {trunContent}
            </div>

            <div className="flex justify-between items-end px-4 pb-2 ">
                <p className="text-sm text-gray-500">created At: {date}</p>
            </div>
        </NavLink>




    </div>
}