import React from "react";

export const Card = ({title, action, children}) => {
    return (
        <div className="bg-white md:rounded shadow-sm border border-gray-300 w-full min-h-full">
            <div className="border-b border-gray-300 bg-gray-100 md:rounded-t p-2 shadow-sm flex items-center">
                <span className="text-lg text-gray-800 flex-grow">{title}</span>
                {
                    action ? action() : null
                }
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}
