import React, { FC } from "react";

type Props = {
  children: any
  step: number
}

export const Step: FC<Props> = ({ children }) => (
  <>
    {children}
  </>
);
