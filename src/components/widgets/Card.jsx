import React from "react";

export const Card = ({title, children}) => {
    return (
        <div className="bg-white rounded shadow-lg border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-100 rounded-t p-2 shadow-sm">
                <span className="text-lg text-gray-800">{title}</span>
            </div>
            <div className="p-4">
                {children}
            </div>
        </div>
    )
}
