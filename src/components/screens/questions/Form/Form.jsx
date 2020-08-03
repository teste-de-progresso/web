import React from "react";
import { TextEditor } from "./TextEditor";

export const Form = (props) => {
  return (
    <div className="bg-gray-100 py-4 px-8">
      <TextEditor data={props.data} />
    </div>
  );
};
