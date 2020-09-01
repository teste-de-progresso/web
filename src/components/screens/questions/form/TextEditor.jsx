import React, { useContext } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Controller } from "react-hook-form";
import { FormContext } from "../../../layout/SteppedForm";
import * as ClassicEditor from "ckeditor5-mathtype/build/ckeditor"

const toolbarOptions = [
  "bold",
  "italic",
  "blockQuote",
  "numberedList",
  "bulletedList",
  "imageUpload",
  "insertTable",
  "tableColumn",
  "tableRow",
  "mergeTableCells",
  "|",
  "MathType",
  "ChemType",
  "|",
  "undo",
  "redo",
];

export const TextEditor = ({ name, defaultValue = "" }) => {
  const formContext = useContext(FormContext);

  return (
    <Controller
      control={formContext.control}
      name={name}
      defaultValue={defaultValue}
      render={({ onChange, value }) => (
        <CKEditor
          editor={ClassicEditor}
          data={value}
          config={{
            toolbar: toolbarOptions,
            ckfinder: {
              uploadUrl: process.env.REACT_APP_BACKEND_URL + "/picture/upload",
            },
          }}
          onChange={(_, editor) => onChange(editor.getData())}
        />
      )}
    />
  );
};
