import React from "react";

export const Input = React.forwardRef((props, ref) => {
    return props.multiline ? <textarea className="block bg-gray-100 rounded p-1 w-full border-gray-300 border shadow-sm"
                                    ref={ref} {...props}/>  : <input className="block bg-gray-100 rounded p-1 w-full border-gray-300 border shadow-sm"
                                           ref={ref} {...props}/>
});
