import React from "react";

export const Button = ({children, onClick, className}) => {

    const handleClick = () => {
        if(onClick) {
            onClick();
        }
    }

    return (
        <div className={className}>
            <a className="block text-center cursor-pointer bg-primary-normal p-2 px-8 rounded text-white hover:bg-primary-dark shadow-lg hover:shadow-lg w-full"
                    onClick={() => handleClick()}>
                {children}
            </a>
        </div>
    )
}
