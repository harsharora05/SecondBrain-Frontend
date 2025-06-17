import { CloseIcon } from "../assets/closeIcon";
import { useShareContentModal, useShareModal } from "../state/shareState";
import { CopyIcon } from "../assets/copyIcon";
import axios from "axios";
import { useContentStore } from "../state/contentState";
import { useState } from "react";
import { OrbitProgress } from "react-loading-indicators";




export const SharePopup = () => {
    const toggleShareModal = useShareModal((state) => state.toggleShareModal)
    const isModal = useShareModal((state) => state.isModal)
    const contentId = useShareContentModal((state) => state.contentId)

    const updateContent = useContentStore((state) => state.updateContent);

    const getUpdates = useContentStore((state) => state.getUpdates)

    const [isLoading, setLoading] = useState(false);


    const toggleLinks = async () => {

        if (!contentdata.canShared) {

            //enable link
            setLoading(true);
            const response = await axios.post(`http://localhost:3000/api/v1/e-share/${contentId}`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            const oldLink = response.data.link;
            const newlink = `http://localhost:5173/content-share/${oldLink.split("http://localhost:3000/api/v1/content/")[1]}`

            updateContent(contentId, {
                canShared: true,
                shareLink: newlink,
            });
            setLoading(false);

        } else {
            // disable link
            await axios.post(`http://localhost:3000/api/v1/d-share/${contentId}`, {}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });

            updateContent(contentId, {
                canShared: false,
                shareLink: "",
            });

        }
    }

    const contentdata = getUpdates(contentId);




    return <div>

        {!!isModal && < div className="h-screen w-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center ">

            <div className="bg-white h-60  w-130 flex flex-col p-8 gap-2 rounded-md">
                <div className="cursor-pointer flex justify-end pb-4" onClick={() => { toggleShareModal() }}>
                    <CloseIcon size={"size-6"} />
                </div>




                <div className="flex justify-center ">
                    <label className="inline-flex gap-4 items-center cursor-pointer">
                        <input type="checkbox" onChange={() => toggleLinks()} checked={contentdata.canShared} value="" className="sr-only peer" />
                        <div className="ms-3 text-sm font-medium text-gray-900">Enable Share </div>
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                </div>


                {isLoading ? (<div className="flex justify-center items-center p-4 gap-4"><OrbitProgress size="small" color={"#4236d7"} /></div>) : contentdata.canShared && <div className="flex justify-center items-center p-4 gap-4">
                    <p className="border border-gray-300 p-2 min-w-100 max-w-full overflow-hidden text-ellipsis whitespace-nowrap ">{contentdata.link}</p>
                    <span className="hover:cursor-pointer" onClick={() => { navigator.clipboard.writeText(contentdata.link) }}><CopyIcon /></span>

                </div>

                }





            </div>



        </div>
        }
    </div >
}