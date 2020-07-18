import React from "react";

export const Button = (props) => {
    return (
        <button className="bg-blue-600 p-2 px-8 rounded text-white hover:bg-blue-700 shadow-lg m-2 hover:shadow-lg">
            {props.children}
        </button>
    )
}
