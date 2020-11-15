import React from "react";

export const Input = React.forwardRef((props, ref) => (props.multiline ? (
  <textarea
    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
    ref={ref}
    {...props}
  />
) : (
  <input
    className="block rounded p-1 w-full border-gray-400 border shadow-sm"
    ref={ref}
    {...props}
  />
)));
