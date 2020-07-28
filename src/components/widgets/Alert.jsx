import React from "react";

export const Alert = (props) => {
    return (
        <div className="w-full md:my-2 p-2 bg-red-600 items-center text-red-100 leading-none lg:rounded flex lg:inline-flex"
             role="alert">
            <span className="flex px-2 py-1 font-bold">Oops</span>
            <span className="font-semibold mr-2 text-left flex-auto">{props.children}</span>
        </div>
    )
}
