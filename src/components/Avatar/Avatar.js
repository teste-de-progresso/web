import React from "react";

export const Avatar = ({ src, className }) => (
  <img
    className={`rounded-full border-2 border-primary-light shadow ${className}`}
    src={src}
    alt="Avatar do usuário"
  />
);
