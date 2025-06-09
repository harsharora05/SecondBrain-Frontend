import type { ReactElement } from "react"


interface itemTypes {
    text: string
    icon: ReactElement
}

export const SideBarItem = (props: itemTypes) => {
    return <div className="flex px-6 py-2 mt-4 items-center gap-4 hover:bg-slate-200 rounded hover:cursor-pointer">
        {props.icon}
        <h3>{props.text}</h3>
    </div>
}