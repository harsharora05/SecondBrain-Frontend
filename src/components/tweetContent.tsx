import { Card } from "./card";
import { useLoginStore } from "../state/authState";
import { useEffect } from "react";
import { useContentStore } from "../state/contentState";
import { loadData } from "../networkReq/contentFetch";


export const TweetContent = () => {

    const isLogin = useLoginStore((state) => state.isLogin);
    const loadContentState = useContentStore((state) => state.LoadContent);
    const contents = useContentStore((state) => state.contents);




    useEffect(() => {
        const fetchData = async () => {
            const data = await loadData("http://localhost:3000/api/v1/content-type/tweet");
            loadContentState(data);
        }

        fetchData();

    }, [isLogin])

    return <>
        {contents.length > 0 ? <div className="grid grid-cols-3 gap-x-2 gap-y-10 p-4">
            {contents.map((cntent) =>
                <Card key={cntent._id} _id={cntent._id} createdAt={cntent.createdAt} content={cntent.content} title={cntent.title} type={cntent.type} tags={cntent.tags} />
            )}

        </div> : <div className=" flex items-center justify-center h-screen">
            {isLogin ? <h1>No Content Found</h1> : <h1>Please Login To add content</h1>}
        </div>
        }


    </>





}