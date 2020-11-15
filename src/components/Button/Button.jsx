import React from "react";

export const Button = ({
  children,
  onClick,
  className,
  type = "button",
  secondary,
  style,
  disabled,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const colorClasses = (() => {
    if (secondary) return "bg-gray-200 hover:bg-gray-400 text-gray-800";

    return "bg-primary-normal hover:bg-primary-dark text-white";
  })();

  return (
    <div className={className} style={style}>
      <button
        type={type}
        disabled={disabled}
        className={`transition duration-300 ease-in-out block text-center cursor-pointer p-2 px-8 rounded shadow-lg hover:shadow-lg w-full ${colorClasses}`}
        onClick={() => handleClick()}
      >
        {children}
      </button>
    </div>
  );
};
