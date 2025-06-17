import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ContentType, tags } from "../Types/contentType";
import { Tag } from "./tag";
import { toast, ToastContainer } from "react-toastify";

export const SharedContentPage = () => {

    const [content, setContent] = useState<ContentType>();
    const { shareId } = useParams();
    const requestSharedData = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/api/v1/content/${shareId}`);
            setContent(response.data.content);
        } catch (err: any) {

            const message = err.response?.data?.message || "Something went wrong";
            toast.warning(message);
        }



    }
    useEffect(() => {
        requestSharedData();
    }, [shareId])


    return <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
            <ToastContainer position={"bottom-right"} customProgressBar={false} />
            {content && <div className="p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">{content?.title} <span></span></h1>
                <div className="flex gap-3 w-238 mt-5">
                    {content?.tags.map((tag: tags) => <Tag key={tag._id} id={tag._id} content={tag.tag} isClose={false} />)}
                </div>
                <div className="text-sm text-gray-500 mb-6 flex">
                </div>
                <div className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: content?.content as string }}>
                </div>
            </div>}
        </div>
    </div >


}


