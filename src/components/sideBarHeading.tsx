import type { ReactElement } from "react"

interface headingTypes {
    text: string
    icon: ReactElement
}

export const SideBarHeading = (props: headingTypes) => {
    return <div className="flex items-center py-6 px-4 gap-2">

        {props.icon}
        <h1 className="font-bold text-xl opacity-0 hidden xl:block xl:opacity-100 group-hover:block group-hover:opacity-100 transition-all duration-900 hover:cursor-pointer">{props.text}</h1>
    </div>
}