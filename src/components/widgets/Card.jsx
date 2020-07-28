import React from "react";

export const Card = ({title, children, className}) => {
    return (
        <div className={className}>
            <div className="bg-white md:rounded shadow-lg border border-gray-200 w-full h-full">
                <div className="border-b border-gray-200 bg-gray-100 md:rounded-t p-2 shadow-sm">
                    <span className="text-lg text-gray-800">{title}</span>
                </div>
                <div className="p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}
