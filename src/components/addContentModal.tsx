import JoditEditor from "jodit-react"
import { Button } from "./button"
import { CloseIcon } from "../assets/closeIcon"
import React, { useRef, useState } from "react"
import axios from "axios"
import { useContentStore } from "../state/contentState"
import { Tag } from "./tag"
import { useTagStore } from "../state/tagState"
import type { tag } from "../state/tagState"


interface AddContentModalType {
    isOpen: boolean
    setOpen: () => void
}

export const AddContentModal = (props: AddContentModalType) => {

    const titleRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLSelectElement>(null);
    const [content, setContent] = useState("")
    const tagRef = useRef<HTMLInputElement>(null);


    const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const addContent = useContentStore((state) => state.addContent);
    const addTag = useTagStore((state) => state.addTag);
    const clearTag = useTagStore((state) => state.clearTag);
    const tags = useTagStore((state) => state.tags);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", " "].includes(e.key)) {
            e.preventDefault();
            const tag: tag = {
                id: generateId(),
                tagContent: tagRef.current?.value.trim() as string
            }
            addTag(tag)
            if (tagRef.current) {
                tagRef.current.value = "";
            }
        }
    }

    const addData = async () => {
        const finalTags = tags.map((tag) => { return tag.tagContent });

        const response = await axios.post('http://localhost:3000/api/v1/content', {
            "title": titleRef.current?.value,
            "content": content,
            "type": typeRef.current?.value,
            "tags": finalTags
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        });

        addContent(response.data.content[0]);
        clearTag();
        setContent("");
        props.setOpen();

    }


    return <div>
        {props.isOpen && <div className="h-screen w-screen  bg-black/50  fixed left-0 top-0 flex justify-center items-center overflow-y-scroll">

            <div className="w-155  bg-white flex flex-col gap-3 px-6 py-4 rounded-md">
                <div className="cursor-pointer flex justify-end" onClick={() => { props.setOpen() }}>
                    <CloseIcon size={"size-6"} />
                </div>
                <input type="text" ref={titleRef} className="border border-slate-300 rounded-md px-4 py-2 " placeholder="Title" />
                <select name="types" ref={typeRef} className="border border-slate-300 rounded-md px-4 py-2" id="">
                    <option value="select" disabled selected>Type</option>
                    <option value="document">Document</option>
                    <option value="youtube">Youtube</option>
                    <option value="tweet">Tweet</option>
                </select>

                <JoditEditor value={content} onBlur={(newContent) => { setContent(newContent) }} config={{
                    allowResizeX: false,
                    allowResizeY: false,
                    placeholder: "Start Typing....", height: 300
                }} />

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => <Tag key={tag.id} content={tag.tagContent} id={tag.id} isClose={true}></Tag>)}

                </div>



                <input ref={tagRef} disabled={tags.length >= 5} placeholder="Tags" onKeyDown={handleKeyDown} className="border border-slate-300 rounded-md px-4 py-2 resize-none" />

                <div className="flex justify-center p-2">
                    <Button text={"Submit"} onClick={addData} style="Primary" />
                </div>

            </div>
        </div>}
    </div>
}