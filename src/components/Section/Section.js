import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const Section = ({ children, title }) => {
  if (window.screen.width < 640) {
    return (
      <>
        <div className="bg-gray-200 rounded mt-4 w-full">
          <div className=" inline-flex items-center justify-between w-full p-2">
            <h2 className="text-gray-500 pt-2 text-sm">{title}</h2>
            <button>
              <FaChevronDown />
            </button>
          </div>
          <hr className="border-t border-gray-400 mb-4 mx-2" />
          <div>
            <div className="py-1 text-sm">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="bg-gray-200 p-4 rounded my-2">
      <h2 className="text-gray-500 font-medium text-xl">{title}</h2>
      <hr className="border-t border-gray-400 m-px" />
      <div className="p-2">
        {children}
      </div>
    </div>
  );
};
