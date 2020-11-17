import React from "react";

export const ListItem = ({
  children, onClick, header, icon, iconClick,
}) => (
  <div
    className="border-l-8 border-primary-light flex bg-white hover:bg-unifeso-50 rounded shadow hover:shadow-md cursor-pointer group transition-all duration-500"
  >
    <div
      className="flex flex-col w-full px-3 py-2"
      onClick={onClick}
    >
      {header && (
      <h2>
        {header}
      </h2>
      )}
      {children}
    </div>
    <div
      className="bg-red-300 flex flex-col relative flex-grow justify-center"
    >
      {icon
        && (
        <div
          className="group-hover:block absolute bg-gray-300 hover:bg-primary-normal text-gray-500 hover:text-gray-100 hover:shadow-lg rounded-full p-2 cursor-pointer shadow-inner transition-all duration-500"
          style={{ left: "-1.5rem" }}
          onClick={() => iconClick()}
        >
          {icon}
        </div>
        )}
    </div>
  </div>
);
