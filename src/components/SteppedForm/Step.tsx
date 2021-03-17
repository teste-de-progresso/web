import React, { FC } from "react";

type Props = {
  children: any
}

export const Step: FC<Props> = ({ children }) => (
  <>
    {children}
  </>
);
