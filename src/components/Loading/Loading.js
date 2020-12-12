import React from "react";
import { CircularProgress } from "@material-ui/core";

export const Loading = () => (
  <div
    className="grid"
    style={{ placeItems: "center" }}
  >
    <CircularProgress />
  </div>
);
