import { CloseIcon } from "../assets/closeIcon"
import { useTagStore } from "../state/tagState"


interface tagInterface {
    id: string,
    content: string,
    isClose: boolean
}

export const Tag = (props: tagInterface) => {
    const removeTag = useTagStore((state) => state.removeTag);

    return <div className="relative bg-purple-300 flex justify-center rounded-md py-2 px-3" >
        <p>{props.content}</p>
        {!!props.isClose && < div className="absolute top-0 right-0 hover:cursor-pointer py-1" onClick={() => removeTag(props.id as string)}>
            <CloseIcon size={"size-3"} />
        </div>
        }

    </div >
}