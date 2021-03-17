import React, { CSSProperties, FC } from "react";

type Props = {
  children?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  secondary?: boolean
  disabled?: boolean
  style?: CSSProperties
}

export const Button: FC<Props> = ({
  children,
  onClick,
  className,
  type = "button",
  secondary,
  disabled,
  style,
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const styleClasses = {
    secondary: "bg-gray-200 hover:bg-gray-400 text-gray-800",
    primary: "bg-primary-normal hover:bg-primary-dark text-white",
    disabled: "bg-gray-200 text-gray-600 cursor-not-allowed shadow-none hover:shadow-none",
    default: "`transition duration-300 ease-in-out block text-center cursor-pointer p-2 px-8 rounded shadow-lg hover:shadow-lg w-full",
  };

  let additionalClasses = "";

  if (disabled) {
    additionalClasses = additionalClasses.concat(" ", styleClasses.disabled);
  } else if (secondary) {
    additionalClasses = additionalClasses.concat(" ", styleClasses.secondary);
  } else {
    additionalClasses = additionalClasses.concat(" ", styleClasses.primary);
  }

  return (
    <div className={className} style={style}>
      <button
        type={type}
        disabled={disabled}
        className={styleClasses.default + additionalClasses}
        onClick={() => handleClick()}
      >
        {children}
      </button>
    </div>
  );
};
