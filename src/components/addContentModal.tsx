import JoditEditor from "jodit-react"
import { Button } from "./button"
import { CloseIcon } from "../assets/closeIcon"
import React, { useRef, useState } from "react"
import axios from "axios"
import { useContentStore } from "../state/contentState"
import { Tag } from "./tag"
import { useTagStore } from "../state/tagState"
import type { tag } from "../state/tagState"
import { Controller, useForm } from "react-hook-form"
import { OrbitProgress } from "react-loading-indicators"
import { toast } from "react-toastify"


interface AddContentModalType {
    isOpen: boolean
    setOpen: () => void
}

type Content = {
    "title": string,
    "types": string,
    "content": string
}

export const AddContentModal = (props: AddContentModalType) => {



    const { register, handleSubmit, control, reset, formState: { isSubmitting, errors } } = useForm<Content>();

    const [isValidTag, setValid] = useState(true);
    const tagRef = useRef<HTMLInputElement>(null);


    const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

    const addContent = useContentStore((state) => state.addContent);
    const addTag = useTagStore((state) => state.addTag);
    const clearTag = useTagStore((state) => state.clearTag);
    const tags = useTagStore((state) => state.tags);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (["Enter", " "].includes(e.key)) {
            e.preventDefault();

            if (tagRef.current?.value !== "" && tagRef.current?.value !== "null") {
                setValid(true);
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
    }

    const addData = async (data: Content) => {
        const finalTags = tags.map((tag) => { return tag.tagContent });

        if (finalTags.length === 0) {
            setValid(false);
            return;
        } else {
            setValid(true);
        }

        console.log(data);

        try {


            const response = await axios.post('http://localhost:3000/api/v1/content', {
                "title": data.title,
                "content": data.content,
                "type": data.types,
                "tags": finalTags
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });



            addContent(response.data.content[0]);
            toast.success(response.data.message);
            clearTag();
            props.setOpen();
            reset({
                "content": "",
                "title": "",
                "types": "",
            })

        } catch (e: any) {
            if (e.response.status == 400) {
                toast.warning(e.response.data.message);
            }
        }

    }


    return <div>
        {props.isOpen && <div className="h-screen w-screen  bg-black/50 fixed left-0 top-0 flex justify-center items-center overflow-y-scroll">

            <div className="w-70 ml-12 custmd:ml-0 custmd:w-155 mt-30 pb-8 custmd:mt-0 custmd:pb-0 bg-white flex flex-col gap-3 px-6 py-4 rounded-md">
                <div className="cursor-pointer flex justify-end" onClick={() => {
                    props.setOpen();
                    reset({
                        "content": "",
                        "title": "",
                        "types": "",
                    })
                }}>
                    <CloseIcon size={"size-6"} />
                </div>

                <form className="flex flex-col gap-4">
                    <input type="text"  {...register("title", { required: "Title is required", minLength: { value: 3, message: "Minimum 3 characters" } })} className="border  border-slate-300 rounded-md px-4 py-2 " placeholder="Title" />
                    {errors.title && (
                        <p className="text-red-500 text-sm">{errors.title.message}</p>
                    )}
                    <select {...register("types", { validate: (value) => value !== "" || "Select a valid type" })} className="border border-slate-300 rounded-md px-4 py-2" id="">
                        <option value="" selected >Type</option>
                        <option value="document">Document</option>
                        <option value="youtube">Youtube</option>
                        <option value="tweet">Tweet</option>
                    </select>

                    {errors.types && (
                        <p className="text-red-500 text-sm">{errors.types.message}</p>
                    )}

                    <Controller name="content" control={control} rules={{ required: "Content is required" }} render={({ field }) => (<JoditEditor value={field.value} onBlur={(newContent) => field.onChange(newContent)} config={{
                        allowResizeX: false,
                        allowResizeY: false,
                        placeholder: "Start Typing....", height: 300
                    }} />)} />

                    {errors.content && (
                        <p className="text-red-500 text-sm">{errors.content.message}</p>
                    )}



                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => <Tag key={tag.id} content={tag.tagContent} id={tag.id} isClose={true}></Tag>)}
                    </div>



                    <input ref={tagRef} disabled={tags.length >= 5} placeholder="Tags" onKeyDown={handleKeyDown} className="border border-slate-300 rounded-md px-4 py-2 resize-none" />
                    {!isValidTag && (
                        <p className="text-red-500 text-sm">Atleast 1 tag is required</p>
                    )}


                    <div className="flex justify-center p-2">
                        {isSubmitting ? <OrbitProgress size="small" color={"#3d37a6"} /> : <Button text={"Submit"} onClick={handleSubmit((data) => addData(data))} style="Primary" />}
                    </div>


                </form>

            </div>
        </div>}
    </div>
}