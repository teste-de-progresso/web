import React from "react";

export const Button = ({children, onClick}) => {

    const handleClick = () => {
        if(onClick) {
            onClick();
        }
    }

    return (
        <button className="bg-primary-normal p-2 px-8 rounded text-white hover:bg-primary-dark shadow-lg m-2 hover:shadow-lg"
                onClick={() => handleClick()}>
            {children}
        </button>
    )
}
