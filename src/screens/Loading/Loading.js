import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loading = () => (
  <div className="h-screen w-screen bg-primary-normal grid place-items-center text-white">
    <div style={{ textAlign: "center" }}>
      <CircularProgress color="inherit" />
    </div>
  </div>
);
