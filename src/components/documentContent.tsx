import { Card } from "./card";
import { useLoginStore } from "../state/authState";
import { useEffect, useState } from "react";
import { useContentStore } from "../state/contentState";
import { loadData } from "../networkReq/contentFetch";
import { Commet } from "react-loading-indicators";


export const DocumentContent = () => {

    const isLogin = useLoginStore((state) => state.isLogin);
    const loadContentState = useContentStore((state) => state.LoadContent);
    const clearContent = useContentStore((state) => state.clearContent);

    const contents = useContentStore((state) => state.contents);
    const [isLoading, setLoading] = useState(false);




    useEffect(() => {

        if (isLogin) {
            const fetchData = async () => {
                setLoading(true);
                const data = await loadData("http://localhost:3000/api/v1/content-type/document");
                loadContentState(data);
                setLoading(false);

            }
            fetchData();
        } else {

            clearContent();
        }

        return () => {
            clearContent();
        }



    }, [isLogin])

    return isLoading ? <> <div className="h-screen flex justify-center items-center"> <Commet size="medium" color={"#4236d7"} /> </div>
    </> : <>
        {contents.length > 0 ? <div className="grid grid-cols-3 gap-x-2 gap-y-10 p-4">
            {contents.map((cntent) =>
                <Card key={cntent._id} _id={cntent._id} createdAt={cntent.createdAt} content={cntent.content} title={cntent.title} type={cntent.type} tags={cntent.tags} canShared={cntent.canShared} shareLink={cntent.shareLink} />
            )}
        </div> : <div className="h-screen flex items-center justify-center">
            {isLogin ? <h1>No Content Found</h1> : <h1>Please Login To add content</h1>}
        </div>
        }


    </>





}