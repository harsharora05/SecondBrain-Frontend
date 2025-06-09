import type { ReactElement } from "react"
import { clsx } from "clsx";

type PrimaryOrSecondary = "Primary" | "Secondary";

interface buttonProps {
    text: string,
    style: PrimaryOrSecondary,
    startIcon?: ReactElement,
    onClick?: () => void
}

const defaultStyles = {
    "Primary": "bg-purple-600 text-white",
    "Secondary": "bg-purple-300 text-purple-700"
}


export const Button = (props: buttonProps) => {
    return <button className={clsx(defaultStyles[props.style], 'py-2 px-4 rounded-md font-light cursor-pointer')} onClick={props.onClick} >
        <div className="flex items-center">
            <div className="pr-1">
                {props.startIcon}
            </div>
            {props.text}
        </div> </button>
}