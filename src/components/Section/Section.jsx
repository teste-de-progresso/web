import React from "react";

export const Section = ({ children, title }) => {
  return (
    <div className="bg-gray-200 p-4 rounded my-2">
      <h2 className="text-gray-500 font-medium text-xl">{title}</h2>
      <hr className="border-t border-gray-400 m-px" />
      <div className="p-2">
        {children}
      </div>
    </div>
  )
}