import React from "react";

export const Avatar = ({ src, className }) => {
  const url = () => {
    if (!src) return "https://via.placeholder.com/150";

    return process.env.REACT_APP_BACKEND_URL + src;
  };

  return (
    <img
      className={`rounded-full border-2 border-primary-light shadow ${className}`}
      src={url()}
      alt="Avatar do usuário"
    />
  );
};
